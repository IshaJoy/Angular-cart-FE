import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { UserModel } from '../userModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  searchTerm = new BehaviorSubject("")
  wishlistCount=new BehaviorSubject(0)
  cartCount=new BehaviorSubject(0)


  SERVER_URL = "http://localhost:3000"

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem("token")) {
      this.getWishlistCount()
      this.getCartCount()
    }
   }

  getAllProductsAPI() {
    return this.http.get(`${this.SERVER_URL}/all-products`)
  }

  registerAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/register`, user)

  }
  loginAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/login`, user)
  }
  viewProductAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/view-product/${id}`)

  }


appendTokenToHeader(){
  const token=sessionStorage.getItem("token")
  let headers = new HttpHeaders()
if (token) {
  headers=headers.append("Authorization",`Bearer ${token}`)
}
return {headers}
}


  addtoWishlistAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/add-to-wishlist`,product,this.appendTokenToHeader())

  }

  getWishlistAPI(){
    return this.http.get(`${this.SERVER_URL}/get-wishlist`,this.appendTokenToHeader())

  }
  // to get count
  getWishlistCount(){
    this.getWishlistAPI().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }

  // remove 
  removeWishlistItemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/wishlist-remove/${id}`,this.appendTokenToHeader())

  }

  // add to cart
  addToCartAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/add-to-cart`,product,this.appendTokenToHeader())

  }

  // get cart
  getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/get-cart`,this.appendTokenToHeader())

  }

  // cart count
  getCartCount(){
    this.getCartAPI().subscribe((res:any)=>{
      this.cartCount.next(res.length)
    })
  }

  removeCartItemAPI(id: any) {
    return this.http.delete(`${this.SERVER_URL}/remove-cart/${id}`, this.appendTokenToHeader())
  }

  incrementCartAPI(id: any) {
    return this.http.get(`${this.SERVER_URL}/cart-increment/${id}`, this.appendTokenToHeader())
  }

  decrementCartAPI(id: any) {
    return this.http.get(`${this.SERVER_URL}/cart-decrement/${id}`, this.appendTokenToHeader())
  }

  emptyCartAPI() {
    return this.http.delete(`${this.SERVER_URL}/empty-cart`, this.appendTokenToHeader())
  }

  isLoggedin(){
    return !!sessionStorage.getItem("token")
  }

}