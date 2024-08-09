class Address {
  line1: string
  line2: string
  primary: boolean = false

  constructor(line1: string, line2: string, primary: boolean = false) {
    this.line1 = line1;
    this.line2 = line2;
    this.primary = primary;
  }
}

export default Address;
