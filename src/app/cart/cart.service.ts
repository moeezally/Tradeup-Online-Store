import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient, private appService: AppService) {}

  addToCart(product: any) {
    let quantity = 1;
    let duplicate: boolean = false;
    let cartObject = {
      product: product,
      quantity: quantity,
      price: product.cost * quantity
    };
    let Local_Storage: any[];
    if (localStorage.getItem('cart') == null) {
      Local_Storage = [];
      console.log('Cart Empty', JSON.parse(localStorage.getItem('cart')));
      Local_Storage.push(cartObject);
      localStorage.setItem('cart', JSON.stringify(Local_Storage));
      console.log('New Cart created with products:', JSON.parse(localStorage.getItem('cart')));
      alert('Product Successfully Added');
    } else {
      Local_Storage = JSON.parse(localStorage.getItem('cart'));

      Local_Storage.forEach(cartItem => {
        if (cartObject.product.id == cartItem.product.id) {
          cartItem.quantity = cartItem.quantity + 1;
          cartItem.price += cartItem.product.cost;
          console.log('Duplicate Product found, quantity increased');
          duplicate = true;
        }
      });
      if (duplicate == false) {
        console.log('No Duplicate Found, Product added');

        Local_Storage.push(cartObject);
      }
      localStorage.setItem('cart', JSON.stringify(Local_Storage));
      alert('Product Successfully Added to Cart');
      console.log('Updated Cart', JSON.parse(localStorage.getItem('cart')));
    }
  }

  getTotalCartPrice(): number {
    let TotalPrice: number = 0;
    if (localStorage.getItem('cart') != null) {
      let CartItems: any[] = JSON.parse(localStorage.getItem('cart'));
      CartItems.forEach(item => {
        TotalPrice = TotalPrice + item.price;
      });
    }

    return TotalPrice;
  }

  increaseQuantity(CartObject: any) {
    let updated: boolean = false;
    let CartItems: any[];
    if (localStorage.getItem('cart') != null) {
      CartItems = JSON.parse(localStorage.getItem('cart'));
      CartItems.forEach(item => {
        if (item.product.id == CartObject.product.id) {
          item.quantity += 1;
          item.price += CartObject.product.cost;
          updated = true;
          console.log('increased quantity');
        }
      });
    }
    if (updated) {
      localStorage.setItem('cart', JSON.stringify(CartItems));
      console.log(JSON.parse(localStorage.getItem('cart')));
    }
  }

  decreaseQuantity(CartObject: any) {
    let updated: boolean = false;
    let CartItems: any[];
    if (localStorage.getItem('cart') != null) {
      CartItems = JSON.parse(localStorage.getItem('cart'));
      CartItems.forEach(item => {
        if (item.product.id == CartObject.product.id) {
          if (item.quantity > 1) {
            item.quantity -= 1;
            item.price -= CartObject.product.cost;
            console.log('decreased quantity');
            updated = true;
          } else if (item.quantity == 1) {
            this.deleteFromCart(item);
          }
        }
      });
    }
    if (updated) {
      localStorage.setItem('cart', JSON.stringify(CartItems));
      console.log(JSON.parse(localStorage.getItem('cart')));
    }
  }

  deleteFromCart(CartObject: any) {
    let CartItems: any[];
    let updatedCart: any[];
    if (localStorage.getItem('cart') != null) {
      CartItems = JSON.parse(localStorage.getItem('cart'));
      updatedCart = CartItems.filter(item => item.product.id != CartObject.product.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      console.log('Deleted');
    }
  }

  getCartItems(): any[] {
    let CartItems: any[];
    if (localStorage.getItem('cart') != null) {
      CartItems = JSON.parse(localStorage.getItem('cart'));
    } else {
      CartItems = [];
    }
    return CartItems;
  }

  emptyCart() {
    let Empty: [] = [];
    localStorage.removeItem('cart');
  }

  placeOrder(Order: any) {
    return this.http.post(this.appService.getApiUrl() + 'store/order', Order, {
      headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('id_token')}` })
    });
  }
}
