const FileHound = require('filehound');
const { join, basename, relative } = require('path');

module.exports = class Albums {
    constructor(albumPath) {
        this.albumPath = albumPath;
    }
    getAll() {
        return FileHound.create()
            .path(this.albumPath)
            .depth(0)
            .directory()
            .findSync()
            .map(directory => basename(directory));
    }
    get(name) {
        return {
            name,
            files: FileHound.create()
                .path(join(this.albumPath, name))
                .findSync()
                .map(file => ({
                    name: relative(this.albumPath, file),
                    path: file,
                })),
        };
    }
}