import Photo from './Photo';

export default class FlickrPhoto extends Photo {

    constructor(id, owner, secret, server, farm) {
        super();

        this.id = id;
        this.owner = owner;
        this.secret = secret;
        this.server = server;
        this.farm = farm;
    }

    toUrl() {
        return `https://farm${this.farm}.staticflickr.com/${this.server}/${this.id}_${this.secret}.jpg`;
    }

}
