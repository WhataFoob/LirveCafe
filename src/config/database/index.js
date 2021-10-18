import mongoose from 'mongoose';

const mongoose_driver = {
    connect: async function () {
        try {
            await mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connect Successfully')
        } catch(error) {
            console.log('Connect Failure')
        }
        
    }
}

export default mongoose_driver;