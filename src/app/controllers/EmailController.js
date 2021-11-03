import otpGenerator from 'otp-generator';

import mailer from '../utils/mailer.js';

const EmailController = {
    // POST /email/send-token

    sendToken: async (req, res, next) => {
       
        try {
            const { email } = req.body;
            
            const subject = `Mã xác thực thanh toán tới từ LirveCaféHust`
            const body = otpGenerator.generate(6, { upperCase: false, specialChars: false });
            await mailer.sendMail( email, subject, body )

            res.send({token: body, isError: false});
        } catch(error) {
            console.log(error);
            res.send({error: error, isError: true});
        }
    }

}

export default EmailController;