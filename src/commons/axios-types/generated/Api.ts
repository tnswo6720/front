/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Role {
  name?: string;
}

export interface User {
  /** @format int64 */
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  profileImageUrl?: string;
  nickname?: string;
  /** @format date-time */
  registrationDate?: string;
  introduction?: string;
  /** @format date */
  dateOfBirth?: string;
  gender?: string;
  salt?: string;
  roles?: Role[];
}

export interface Post {
  /** @format int64 */
  id?: number;
  title?: string;
  content?: string;
  author?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  imageUrl?: string;
  videoUrl?: string;
  youtubeUrl?: string;
  mapLocation?: string;
  votes?: string;
  /** @format double */
  averageRating?: number;
}

/** 댓글 정보 */
export interface Comment {
  /**
   * 댓글 ID
   * @format int64
   */
  id?: number;
  post?: Post;
  /** 댓글 내용 */
  content?: string;
  /** 댓글 작성자 */
  author?: string;
  /**
   * 댓글 작성 시간
   * @format date-time
   */
  createdAt?: string;
  /**
   * 댓글 평점
   * @format double
   */
  rating?: number;
}

export interface UserRequest {
  username?: string;
  password?: string;
  email?: string;
  profileImageUrl?: string;
  nickname?: string;
  /** @format date */
  dateOfBirth?: string;
  gender?: string;
  introduction?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8080" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:8080
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags User API
     * @name GetUserById
     * @summary 특정 ID의 사용자 조회
     * @request GET:/api/users/{userId}
     */
    getUserById: (userId: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/users/${userId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User API
     * @name UpdateUser
     * @summary 특정 ID의 사용자 업데이트
     * @request PUT:/api/users/{userId}
     */
    updateUser: (userId: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/users/${userId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User API
     * @name DeleteUser
     * @summary 특정 ID의 사용자 삭제
     * @request DELETE:/api/users/{userId}
     */
    deleteUser: (userId: number, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/users/${userId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role API
     * @name UpdateRole
     * @summary 특정 ID의 역할을 업데이트 합니다.
     * @request PUT:/api/roles/update/{roleId}
     */
    updateRole: (roleId: number, data: Role, params: RequestParams = {}) =>
      this.request<Role, any>({
        path: `/api/roles/update/${roleId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags POSTS API
     * @name UpdatePost
     * @summary 특정 ID의 게시물을 업데이트합니다.
     * @request PUT:/api/posts/view/{id}
     */
    updatePost: (id: number, data: Post, params: RequestParams = {}) =>
      this.request<Post, any>({
        path: `/api/posts/view/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comment API
     * @name UpdateComment
     * @summary 특정 ID의 댓글을 수정합니다.
     * @request PUT:/api/comments/update/{id}
     */
    updateComment: (id: number, data: Comment, params: RequestParams = {}) =>
      this.request<Comment, any>({
        path: `/api/comments/update/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User API
     * @name Signup
     * @summary 사용자 가입을 위한 엔드포인트
     * @request POST:/api/users/signup
     */
    signup: (data: UserRequest, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/users/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role API
     * @name CreateRole
     * @summary 새로운 역할을 생성합니다.
     * @request POST:/api/roles/create
     */
    createRole: (data: string, params: RequestParams = {}) =>
      this.request<Role, any>({
        path: `/api/roles/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags POSTS API
     * @name CreatePost
     * @summary 새로운 게시물을 생성합니다.
     * @request POST:/api/posts/create
     */
    createPost: (data: Post, params: RequestParams = {}) =>
      this.request<Post, any>({
        path: `/api/posts/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comment API
     * @name CreateComment
     * @summary 새로운 댓글 생성
     * @request POST:/api/comments/create
     */
    createComment: (data: Comment, params: RequestParams = {}) =>
      this.request<Comment, any>({
        path: `/api/comments/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User API
     * @name GetAllUsers
     * @summary 모든 사용자 조회
     * @request GET:/api/users
     */
    getAllUsers: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/api/users`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags board-controller
     * @name Test
     * @request GET:/api/test
     */
    test: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/test`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role API
     * @name GetAllRoles
     * @summary 모든 역할을 조회합니다.
     * @request GET:/api/roles
     */
    getAllRoles: (params: RequestParams = {}) =>
      this.request<Role[], any>({
        path: `/api/roles`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role API
     * @name GetRoleByName
     * @summary 특정 ID의 역할을  조회합니다.
     * @request GET:/api/roles/read/{roleName}
     */
    getRoleByName: (roleName: string, params: RequestParams = {}) =>
      this.request<Role, any>({
        path: `/api/roles/read/${roleName}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags POSTS API
     * @name GetAllPosts
     * @summary 모든 게시물을 조회합니다.
     * @request GET:/api/posts
     */
    getAllPosts: (params: RequestParams = {}) =>
      this.request<Post[], any>({
        path: `/api/posts`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags POSTS API
     * @name GetPostById
     * @summary 특정 ID의 게시물을 조회합니다.
     * @request GET:/api/posts/list/{id}
     */
    getPostById: (id: number, params: RequestParams = {}) =>
      this.request<Post, any>({
        path: `/api/posts/list/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comment API
     * @name GetCommentById
     * @summary 특정 ID의 댓글을 조회합니다.
     * @request GET:/api/comments/read/{id}
     */
    getCommentById: (id: number, params: RequestParams = {}) =>
      this.request<Comment, any>({
        path: `/api/comments/read/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role API
     * @name DeleteRole
     * @summary 특정 ID의 역할을 삭제합니다.
     * @request DELETE:/api/roles/delete/{roleId}
     */
    deleteRole: (roleId: number, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/roles/delete/${roleId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags POSTS API
     * @name DeletePost
     * @summary 특정 ID의 게시물을 삭제합니다.
     * @request DELETE:/api/posts/delete/{id}
     */
    deletePost: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/posts/delete/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comment API
     * @name DeleteComment
     * @summary 특정 ID의 댓글을 삭제합니다.
     * @request DELETE:/api/comments/delete/{id}
     */
    deleteComment: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/comments/delete/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
}
