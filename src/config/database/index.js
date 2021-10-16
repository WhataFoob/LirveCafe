import mongoose from 'mongoose';

const connectObj = {
    connect: async function () {
        try {
            await mongoose.connect('mongodb://localhost: 27017/bookstore_dev', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });
    
            console.log('Kết nối thành công')
    
        } catch(error) {
            console.log('Kết nối thất bại')
        }
    }
}

export default connectObj;