import axios from "axios";
import protected_api from "./api/protected_api";
import {
  Salon,
  SalonRequest,
  SalonResponse,
  SalonUpdateRequest,
} from "@/types/salones";
import { SALONES, SERVER_ERROR } from "@/constants/app_constants";

export async function getSalones(): Promise<Array<Salon>> {
  try {
    const response = await protected_api.get<Array<Salon>>(`${SALONES}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
    throw new Error(SERVER_ERROR);
  }
}

export async function createSalon(body: SalonRequest): Promise<SalonResponse> {
  try {
    const response = await protected_api.post<SalonResponse>(
      `${SALONES}`,
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

export async function updateSalon(
  body: SalonUpdateRequest,
): Promise<SalonResponse> {
  try {
    const response = await protected_api.put<SalonResponse>(
      `${SALONES}/${body.id}`,
      { name: body.name },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
    throw new Error(SERVER_ERROR);
  }
}

export async function deleteSalon(body: string): Promise<SalonResponse> {
  try {
    const response = await protected_api.delete<SalonResponse>(
      `${SALONES}/${body}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
    throw new Error(SERVER_ERROR);
  }
}
