const db = require("../config/db");

// Duplication check for email and username
const checkDuplicateEmailorUsername = (email,username) => {
    return new Promise((resolve, reject) => {
        const query = "Select * from users where email = ? OR username = ?";
        console.log(query);
        const values = [email, username];
        db.query(query, values, (err, results) => {
            if(err) return reject(err);
            resolve(results);
        });
    });
}

// Check if email exists or not
const checkEmailExistorNot = (email) => {
    // console.log("e=>",email);
    return new Promise((resolve,reject) => {
        const query = "Select * from users where email = ?";
        const values = [email];
        db.query(query,values, (err,results) => {
            if(err) return reject(err);
            resolve(results);
        });
    });
}

// 🔍 Get user by ID
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, res) => {
      if (err) return reject(err);
      resolve(res[0]);
    });
  });
};

// #######################################################################################################################################
// 1) User registration

const registerUser = (name,username,email,phone,password) => {
    return new Promise((resolve, reject) => {
        const query = "Insert into users (fullname, username, email, phone, password, created_at) VALUES ( ?, ?, ?, ?, ?, now()) ";
        const values = [name, username, email, phone, password, Date.now()];
        db.query(query,values, (err, results) => {
            if(err) return reject(err);
            resolve(results);
        });
    });
}

// Store Register user email verification token
const storeEmailVerificationToken = (userId, tokenHash, expiresAt) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO email_verifications (user_id, token_hash, created_at, expires_at)
      VALUES (?, ?, NOW(), ?)
    `;
    db.query(query, [userId, tokenHash, expiresAt], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Find valid email verification token
const findValidVerificationToken = (tokenHash) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM email_verifications 
      WHERE token_hash = ? AND used = 0 AND expires_at > NOW()
    `;
    db.query(query, [tokenHash], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Mark token as used after successful verification
const markTokenUsed = (id) => {
  console.log("idgghjd=>",id);
  return new Promise((resolve, reject) => {
    console.log("UPDATE email_verifications SET used = 1, verified_at = NOW() WHERE user_id = ?",
      [id]);
    db.query(
      "UPDATE email_verifications SET used = 1, verified_at = NOW() WHERE user_id = ?",
      [id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// Mark user as verified afteer successful email verification after registration
const verifyUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET is_verified = 1 WHERE id = ?",
      [userId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// #######################################################################################################################################
// 2) Login User Functionality


// 🔐 SAVE OTP
const saveOtp = (user_id, otp, type, expires_at) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO otp_verifications (user_id, otp, type, created_at, expires_at)
       VALUES (?, ?, ?, NOW(), ?)`,
      [user_id, otp, type, expires_at],
      (err, res) => {
        if (err) return reject(err);
        resolve(res);
      }
    );
  });
};

// 🔍 FIND VALID OTP
const findValidOtp = (user_id, otp) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM otp_verifications
       WHERE user_id = ? AND otp = ? AND used = 0 AND expires_at > NOW()
       ORDER BY id DESC LIMIT 1`,
      [user_id, otp],
      (err, res) => {
        if (err) return reject(err);
        resolve(res[0]);
      }
    );
  });
};

// ✅ MARK OTP USED
const markOtpUsed = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE otp_verifications SET verified_at = NOW(), used = 1 WHERE id = ?",
      [id],
      (err, res) => {
        if (err) return reject(err);
        resolve(res);
      }
    );
  });
};

// 🚫 RATE LIMIT (last 5 min)
const countRecentOtp = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) as count FROM otp_verifications
       WHERE user_id = ? AND created_at > NOW() - INTERVAL 5 MINUTE`,
      [user_id],
      (err, res) => {
        if (err) return reject(err);
        console.log("otpcount=>",res[0].count);
        resolve(res[0].count);
      }
    );
  });
};

// Failed login attempts count
const failedLoginCount = (user_id, count) => {
  return new Promise((resolve, reject) => { 
    db.query(
      "UPDATE users SET failed_login_count = ? WHERE id = ?",
      [count, user_id],
      (err, res) => {
        if (err) return reject(err);
        resolve(res);
      }
    );
  });
};

// Lock user account after 5 failed login attempts for 30 minutes
const lockUserAccount = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET is_locked = 1, lock_until = DATE_ADD(NOW(), INTERVAL 30 MINUTE) WHERE id = ?",
      [user_id],  
      (err, res) => {
        // console.log("lockUserAccount=>",err,res);
        if (err) return reject(err);
        resolve(res);
      }       
    );
  });
};

// Unlock user account after lock duration is over
const unlockUserAccount = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query(   
      "UPDATE users SET is_locked = 0, failed_login_count = 0 WHERE id = ?",
      [user_id],
      (err, res) => {
        if (err) return reject(err);
        resolve(res);
      }
    );
  });
};

// Maintain user sessions
const userSessions = (user_id, token, user_auth_type, user_role) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO user_sessions (user_id, token,user_auth_type,user_role) VALUES (?, ?, ?, ?)",
      [user_id, token, user_auth_type, user_role],
      (err, res) => {
        // console.log("userSessions=>",err,res);
        if (err) return reject(err);
        resolve(res);
      }
    );

     db.query(
      "Update users set last_login_datetime = now() where id = ?",
      [user_id],
      (err, res) => {
        // console.log("userSessions=>",err,res);
        if (err) return reject(err);
        resolve(res);
      }
    );


  });
};

// #######################################################################################################################################
// 3) Google OAuth Functionality

// Create user if not exists for Google OAuth login
// const createOAuthUser = (fullname, email, profile_image, auth_type) => {
//   return new Promise((resolve, reject) => { 
//     const query = "Insert into users (fullname, email, profile_image, auth_type, created_at) VALUES (?,'', ?, ?, ? now())";
//     // console.log("createOAuthUser=>",query, [fullname, email, profile_image, auth_type]);
//     const values = [fullname, email, profile_image, auth_type];
//     db.query(query, values, (err, results) => {
//       console.log("createOAuthUser=>",query, values, err, results);
//       if (err) return reject(err);
//       resolve(results);
//     });
//   });
// };

const createOAuthUser = (user) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO users 
      (fullname, username, email, profile_image, mfa_enabled,auth_type, is_verified, created_at) 
      VALUES (?, '', ?, ?, 'N', ?, 1, NOW())
    `;

    const values = [
      user.fullname,
      user.email,
      user.profile_image,
      user.auth_type
    ];

    db.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
// #######################################################################################################################################
// 4) Forget Password Functionality

// Store forgot password token and send email to user
const savePasswordResetToken = (userId, tokenHash, expiresAt) => {
  return new Promise((resolve, reject) => {
    const query = `Insert into password_resets (user_id, token_hash, created_at, expires_at) VALUES (?, ?, now(), ?)`;
    db.query(query, [userId, tokenHash, expiresAt], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Find valid token
const findValidPasswordResetToken = (userId, tokenHash) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM password_resets
      WHERE user_id = ? AND token_hash = ? AND used = 0 AND expires_at > NOW()
    `;
    db.query(query, [userId, tokenHash], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Mark token used
const markPasswordResetTokenUsed = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE password_resets SET used = 1, verified_at = NOW() WHERE id = ?",
      [id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// Update password
const updateUserPassword = (userId, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?",
      [password, userId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// #######################################################################################################################################
// 5) Logout Functionality

const UpdateLastLogoutDateTime = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query(   
      "UPDATE users SET last_logout_datetime = now() where id = ?",
      [user_id],
      (err, res) => {   
        if (err) return reject(err);
        resolve(res);
      }
    );
  });
};

const updateLogoutUserSession = (token, user_id) => {
  return new Promise((resolve, reject) => {
    db.query(   
      "UPDATE user_sessions SET session_active = 0, logout_datetime = NOW() WHERE token = ? and user_id = ?",
      [token, user_id],
      (err, res) => {
        if (err) return reject(err);
        resolve(res);
      }   
    );
  });
};


module.exports = {
  checkDuplicateEmailorUsername, checkEmailExistorNot, getUserById,
  registerUser, storeEmailVerificationToken, findValidVerificationToken, markTokenUsed, verifyUser, userSessions,
  saveOtp, findValidOtp, markOtpUsed, countRecentOtp, failedLoginCount, lockUserAccount, unlockUserAccount,
  createOAuthUser,  
  savePasswordResetToken, findValidPasswordResetToken, markPasswordResetTokenUsed, updateUserPassword,
  UpdateLastLogoutDateTime,updateLogoutUserSession
};