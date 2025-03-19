import {
  Order,
  OrderCompleteResponse,
  OrderRequest,
  OrderResponse,
  OrderResponseComplete,
} from "@/types/orders";
import protected_api from "./api/protected_api";
import { ORDERS, SERVER_ERROR } from "../constants/app_constants";
import axios from "axios";

export async function getOrderByTableId(tableId: string): Promise<Order> {
  try {
    const response = await protected_api.get<OrderResponse>(
      `${ORDERS}/get-order/${tableId}`,
    );
    return response.data.order;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
    throw new Error(SERVER_ERROR);
  }
}

export async function getOrderById(
  orderId: string,
): Promise<OrderCompleteResponse> {
  try {
    const response = await protected_api.get<OrderResponseComplete>(
      `${ORDERS}/${orderId}`,
    );
    return response.data.order;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
    throw new Error(SERVER_ERROR);
  }
}

export async function getOrders() {
  try {
    const response = await protected_api.get(`${ORDERS}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
    throw new Error(SERVER_ERROR);
  }
}

export async function createOrder(body: OrderRequest): Promise<OrderResponse> {
  try {
    const response = await protected_api.post<OrderResponse>(`${ORDERS}`, body);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
    throw new Error(SERVER_ERROR);
  }
}

export async function updateOrder(body: OrderRequest): Promise<OrderResponse> {
  try {
    const response = await protected_api.put<OrderResponse>(
      `${ORDERS}/${body.id}`,
      body,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
    throw new Error(SERVER_ERROR);
  }
}

export async function updateOrderStatus(
  body: OrderRequest,
): Promise<OrderResponse> {
  try {
    const response = await protected_api.put<OrderResponse>(
      `${ORDERS}/update-status`,
      body,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
    throw new Error(SERVER_ERROR);
  }
}

export async function deleteOrder(orderId: string): Promise<OrderResponse> {
  try {
    const response = await protected_api.delete<OrderResponse>(
      `${ORDERS}/${orderId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
    throw new Error(SERVER_ERROR);
  }
}
