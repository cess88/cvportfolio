import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUND;

let cryptPassword = async function(passWord){
    let salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(passWord, salt);
}

let comparePassword = async function(plainPass, hashWord){
    let compare = bcrypt.compare(plainPass, hashWord);
    return compare;
};

export {cryptPassword}
export {comparePassword}