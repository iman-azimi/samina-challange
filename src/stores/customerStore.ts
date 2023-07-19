import { useToast } from "vue-toastification";
const toast = useToast();
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
const router = useRouter();
export const useCustomerStore = defineStore({
  id: "cutomer",
  state: () => {
    return {
      customerList: [] as ICustomer[] | [],
    }
  },
  getters: {
    getCustomers: (state) => {
      state.customerList = JSON.parse(localStorage.getItem('customers')) || [];
      return state.customerList
    },
  },
  actions: {
    createCustomer (customer: any) {
      const customers = JSON.parse(localStorage.getItem('customers')) || [];
      for (let index = 0; index < customers.length; index++) {
        if (Object.values(customers[index]).includes(customer.email)) {
          toast.error('این ایمیل قبلا به ثبت رسیده است')
          throw new Error('user exist!')
        } else if (Object.values(customers[index]).includes(customer.name)) {
          toast.error('این نام قبلا به ثبت رسیده است')
          throw new Error('user exist!') 
        }
      }
      customers.push(customer);
      this.customerList = customers
      localStorage.setItem('customers', JSON.stringify(customers));
      toast.success("مشتری با موفقیت ثبت شد");
      return this.customerList
    },
    deleteCustomer (customer: any) {
      const customers = JSON.parse(localStorage.getItem('customers'))
      const index = customers.findIndex((item)=>{
        if (item.email == customer.email) {
          return item
        }
      })
      customers.splice(index, 1)
      this.customerList = customers
      localStorage.setItem('customers', JSON.stringify(customers));
    },
    editCustomer (oldCustomer: any, newCustomer: any) {
      const customers = JSON.parse(localStorage.getItem('customers'))
      const index = customers.findIndex((item)=>{
        if (item.email == oldCustomer.email) {
          return item
        }
      })
      console.log(index)
      customers[index] = newCustomer
      this.customerList = customers
      localStorage.setItem('customers', JSON.stringify(customers));
    }
  },
});


export interface ICustomer {
  name: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  email: string;
  bankAccountNumber: string;
}