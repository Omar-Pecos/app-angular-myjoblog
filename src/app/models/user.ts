export class User {
		public id: number;
		public role: string;
		public name: string;
		public surname: string;
		public dni : string;
		public email: string;
		public number : number
		public password: string;
		public password_confirmation;

		constructor (id: number,role: string,
			name: string,surname: string,email: string,number: number,password: string)
		{
			this.id = id;
			this.role = role;
		}
}