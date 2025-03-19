export interface Category {
  ownerId: string;
  name: string;
  description: string;
  image: string;
  _id: string;
  __v: number;
}
export interface CreateCategoryRequest {
  name: string;
  description: string;
}
export interface CreateCategoryResponse {
  msg: string;
  category: Category;
}
export interface AllCategoriesResponse {
  msg: string;
  categories: Category[];
}
export interface DeleteCategoryResponse {
  msg: string;
}
export interface EditCategoryResponse {
  msg: string;
  category: Category;
}
export interface EditCategoryRequest {
  id: string;
  name: string;
  description: string;
}
