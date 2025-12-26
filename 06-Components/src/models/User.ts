export default class User {
     id!: string
   name!: string
  phone!: string
  email!: string

  static create({ name, email, phone }: { name: string; email: string; phone: string }) {
    return {
         id: crypto.randomUUID(),
       name: name  || 'snake',
      email: email || 'snake@email.com',
      phone: phone || '140.00',
    }
  }
}
