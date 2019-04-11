module.exports = {


    friendlyName: 'Fileupload',


    description: 'Fileupload profile.',


    inputs: {
    },


    exits: {

    },


    fn: async function (inputs) {

        let req = this.req;
        let res = this.res;
        if (req.method === 'GET') {
            return res.json({
                'status': 'GET not allowed'
            });
        }

        var uploadFile = req.file('userPhoto');

        console.log(uploadFile);

        uploadFile.upload(async function onUploadComplete(err, uploadFile) {
            // Files will be uploaded to .tmp/uploads
            if (err) {
                return res.serverError(err);  // IF ERROR Return and send 500 error with error
            }
            else if (uploadFile.length) {
                console.log('inside else' + uploadFile.length);
                //"fd" contains the actual file path (and name) of your file on disk

                var fileOnDisk = uploadFile[0].fd;
                console.log(fileOnDisk);
                await User.updateOne({ id: req.me.id }).set({ userPhotoURL: fileOnDisk });
            }
        });

        return res.json({
            status: 200
        });

    }


};
