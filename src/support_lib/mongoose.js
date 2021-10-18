export const mongooseDocumentsToObject = function(documents) {
    return documents.map((document) => document.toObject());
};

export const singleMongooseDocumentToObject = function(document) {
    if (document) return document.toObject();
    return document;
}
