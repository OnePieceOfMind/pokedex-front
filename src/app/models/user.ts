export class User{
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public role: string,
        public email: string,
        public password: string,
        public description: string,
        public image: string,

    ){}
}

export interface Password {
    password_old: string;
    password_new: string;
    password_repeat: string;
}