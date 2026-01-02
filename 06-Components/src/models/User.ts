export default class User {
     id!: string
   name!: string
  phone!: string
  email!: string

  private static generateId = () => {
    if (crypto.randomUUID) return crypto.randomUUID() // doesn't work on mobile device hosting
    return new Date().toISOString() + Math.random()
  }

  static create({ name, email, phone }: { name: string; email: string; phone: string }) {
    return {
         id: this.generateId(),
       name: name  || 'snake',
      email: email || 'snake@email.com',
      phone: phone || '140.00',
    }
  }
}
