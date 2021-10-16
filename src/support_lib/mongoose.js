const mongooseUtils = {
    mongooseDocumentsToObject: function(documents) {
        return documents.map((document) => document.toObject());
    },
    singleMongooseDocumenttObject: function(document) {
        if (document) return document.toOject();
        return document;
    }
};

export default mongooseUtils;   