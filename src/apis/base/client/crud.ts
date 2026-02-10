import axios from 'axios';
import {
  BaseCreateRequest,
  BaseDeleteRequest,
  BaseGetByIdRequest,
  BaseGetBySlugRequest,
  BasePaginationRequest,
  BaseRecord,
  BaseRequest,
  BaseUpdateRequest,
} from '../interfaces';
import { BaseCreateResponse, BasePaginationResponse, BaseResponse } from '../interfaces/response';
import { BaseApiClient } from './client';

interface BaseCrudApiClientOptions {
  baseUrl: string;
}

export class BaseCrudApiClient<T extends BaseRecord = BaseRecord> extends BaseApiClient {
  constructor({ baseUrl }: BaseCrudApiClientOptions) {
    super(
      axios.create({
        baseURL: baseUrl,
        params: {
          // reFetch: process.env.NODE_ENV === 'development'
        },
      }),
    );
  }

  create(request: BaseCreateRequest<T>): Promise<BaseCreateResponse<T>> {
    return this.client.post('', request.body, { signal: request.signal });
  }

  getAll(request: BasePaginationRequest): Promise<BasePaginationResponse<T>> {
    return this.client.get('', { params: request.params, signal: request.signal });
  }

  getById(request: BaseGetByIdRequest): Promise<BaseCreateResponse<T>> {
    return this.client.get(`/${request.pathParams.id}`, { signal: request.signal, params: request.params });
  }

  getBySlug(request: BaseGetBySlugRequest): Promise<BaseCreateResponse<T>> {
    return this.client.get(`/slug/${request.pathParams.slug}`, { signal: request.signal, params: request.params });
  }

  update(request: BaseUpdateRequest<T>): Promise<BaseCreateResponse<T>> {
    return this.client.patch(`/${request.pathParams.id}`, request.body, { signal: request.signal });
  }

  delete(request: BaseDeleteRequest): Promise<BaseCreateResponse<T>> {
    return this.client.delete(`/${request.pathParams.id}`, { signal: request.signal });
  }

  getSingleton(request: BaseRequest): Promise<BaseResponse<T>> {
    return this.client.get('', { signal: request.signal, params: request.params });
  }
}
