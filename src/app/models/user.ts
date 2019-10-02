export class User {
		public id: number;
		public role: string;
		public name: string;
		public surname: string;
		public dni : string;
		public email: string;
		public password: string;

		constructor (id: number,role: string,
			name: string,surname: string,email: string,password: string)
		{
			this.id = id;
			this.role = role;
		}
}