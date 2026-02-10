# TOAM v2 Frontend

> Ngôi nhà của sự xuất sắc trong bất động sản

## Cài đặt

### Yêu cầu môi trường

- Node.js >= 22
- yarn >= v1

### Cài đặt các phụ thuộc

```sh
yarn install
```

### Chạy ứng dụng

- Chế độ phát triển

  ```sh
  yarn dev
  ```

- Trên máy chủ

  ```sh
  yarn build
  yarn start
  ```

## Các nguyên tắc phát triển

### Kiến trúc dự án

- Sử dụng kiến trúc module để tổ chức mã nguồn.
- Mỗi module nằm trong thư mục riêng của nó, với cấu trúc rõ ràng:
  - `apis/`: Chứa các API client để giao tiếp với backend, sử dụng [axios](https://axios-http.com/) để thực hiện các yêu cầu HTTP.
  - `app/`: Thư mục mặc định của Next.js, chứa các route và layout, tham khảo [tài liệu Next.js](https://nextjs.org/docs/app/building-your-application/routing).
  - `components/`:
    - `decorators/`: Chứa các thành phần có chức năng trang trí (decorators) ví dụ như một đường thẳng với mũi tên ở đầu, một dấu chấm tròn, v.v.
    - `errors/`: Chứa các thành phần hiển thị lỗi.
    - `layouts/`: Chứa các thành phần hiển thị layout của trang.
    - `theme/`: Thường chứa cấu hình chủ đề gồm màu sắc, kiểu chữ, v.v.
    - `ui/`: Chứa các thành phần giao diện người dùng chung, không chứa logic nghiệp vụ, có thể tái sử dụng
  - `hooks/`: Chứa các hook tùy chỉnh dùng chung trong toàn bộ ứng dụng.
  - `assets/`:
    - `images/`: Chứa các hình ảnh dạng bitmap.
    - `svg/`: Chứa các hình ảnh dạng vector.
    - `index.ts`: Vui lòng export tất cả các hình ảnh và svg từ đây để dễ dàng sử dụng trong ứng dụng.
  - `config/`: Chứa các tệp cấu hình của ứng dụng, ví dụ như cấu hình cho các thư viện bên ngoài.
  - `features/`:
    - `pages/`: Chứa các trang của ứng dụng, mỗi trang là một module riêng biệt, trong mỗi trang có thể chứa các thư mục con như `components/`, `hooks/`
  - `stores/`: Chứa các kho lưu trữ trạng thái toàn cục, sử dụng [Zustand](https://zustand-demo.pmnd.rs/) để quản lý trạng thái.

### Navigation và Routing

- Sử dụng các component và hook trong `@app/navigation` để quản lý điều hướng và routing.

> [!NOTE]
> Không sử dụng trực tiếp `next/router` hoặc `next/navigation`. Thay vào đó, hãy sử dụng các component và hook đã được cung cấp trong `@app/navigation` để dễ thay đổi và mở rộng sau này.

### Gọi API

- Sử dụng các API client trong `apis/<server-name>` để thực hiện các yêu cầu HTTP.
- Kế thừa các interface từ `apis/base` để đảm bảo tính nhất quán trong việc định nghĩa các API client.
- Sử dụng [React Query](https://tanstack.com/query/latest) để quản lý trạng thái của các yêu cầu API, bao gồm caching, refetching, và error handling.

Ví dụ:

- Tạo một user API client cho app `toam`:

```ts
// apis/toam/client/users.ts
class ToamApiUsersClient extends ToamCrudApiClient<ToamApiUser> {
  constructor() {
    super('users');
  }
}

export const toamApiUsersClient = new ToamApiUsersClient();

// apis/toam/client/index.ts
import { toamApiUsersClient } from './users';

export const toamApi = {
  users: toamApiUsersClient,
};
```

- Sử dụng API client trong một component:

```tsx
import { useQuery } from '@tanstack/react-query';

// ...

export default function UserList() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => toamApi.users.getAll(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!users.pagination.total) {
    return <div>No users found</div>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.first_name}</li>
      ))}
    </ul>
  );
}
```

### Ngày và giờ

- Sử dụng `@app/date` để thao tác với ngày và giờ. Đây là một wrapper cho [dayjs](https://day.js.org/) đã được cấu hình sẵn.

```ts
import { date } from '@app/date';
```

## Tài liệu liên quan

- [React.js](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [React Query](https://tanstack.com/query/latest)
- [Zustand](https://zustand-demo.pmnd.rs/)
