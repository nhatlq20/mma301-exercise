# LỊCH SỬ LÀM VIỆC & HƯỚNG DẪN THỰC HÀNH LAB MMA301
**Dự án:** `my-daily-notes`  
**Công nghệ:** React Native 0.86.3 | React 19.2.3 | Expo SDK 57  
**Ngày thực hiện:** 30/09/2026  

---

## MỤC LỤC
1. [Giai đoạn 1: Hướng dẫn thực hành Lab](#1-giai-đoạn-1-hướng-dẫn-thực-hành-lab)
   - [Bước 5.3: Kiểm tra Component (Tab Components)](#bước-53-kiểm-tra-component-tab-components)
   - [Bước 6: Quan sát Re-render (Highlight Updates)](#bước-6-quan-sát-re-render-highlight-updates)
   - [Bước 7: Tối ưu Re-render bằng React.memo](#bước-7-tối-ưu-re-render-bằng-reactmemo)
   - [Bước 8: Performance Profiling (Profiler Tab)](#bước-8-performance-profiling-profiler-tab)
2. [Giai đoạn 2: Minh họa Context API qua nhiều cấp Component (Giải quyết Prop Drilling)](#2-giai-đoạn-2-minh-họa-context-api-qua-nhiều-cấp-component-giải-quyết-prop-drilling)
   - [2.1 Vấn đề Prop Drilling & Giải pháp](#21-vấn-đề-prop-drilling--giải-pháp)
   - [2.2 Cấu trúc cây Component (Component Tree)](#22-cấu-trúc-cây-component-component-tree)
   - [2.3 Hướng dẫn quan sát trên React DevTools](#23-hướng-dẫn-quan-sát-trên-react-devtools)

---

## 1. Giai đoạn 1: Hướng dẫn thực hành Lab

### Bước 5.3: Kiểm tra Component (Tab Components)
1. **Tại panel bên trái:** Click chọn component `HomeScreen`.
2. **Tại panel bên phải:** Mục **`hooks`** hiển thị rõ:
   ```text
   ▼ Theme:
     ▼ Context: {theme: "light", toggleTheme: toggleTheme() {}}
         theme: "light"
         toggleTheme: toggleTheme() {}
   ```
3. **Thử nghiệm sửa State trực tiếp:**
   - Chọn component `ThemeProvider` ở panel bên trái.
   - Nhìn sang panel bên phải, click đúp vào chữ `"light"` trong mục `State: "light"` đổi thành `"dark"` rồi nhấn Enter.
   - Giao diện app trên máy ảo lập tức chuyển sang Dark Mode.

---

### Bước 6: Quan sát Re-render (Highlight Updates)
1. Trong React DevTools, bấm biểu tượng **Bánh răng (⚙)** cạnh thanh tìm kiếm.
2. Tích chọn: ☑ **"Highlight updates when components render."**
3. Quay lại máy ảo, bấm nút **"Toggle Theme"** nhiều lần.
4. **Nhận xét:** Toàn bộ vùng màn hình `HomeScreen` và các nút bấm lóe sáng viền xanh lá/vàng. Điều này xác nhận khi State của Context thay đổi, các component lắng nghe Context sẽ tự động re-render.

---

### Bước 7: Tối ưu Re-render bằng React.memo

#### Mã nguồn:
- **[src/components/Title.js](file:///e:/Semester%207/MMA301/my-daily-notes/src/components/Title.js):**
  ```javascript
  import React from 'react';
  import { Text } from 'react-native';

  function Title({ text, color }) {
    console.log('Title render');
    return <Text style={{ color, fontSize: 22, marginBottom: 16 }}>{text}</Text>;
  }

  export default React.memo(Title);
  ```

#### Thực nghiệm kiểm chứng:
1. **Trường hợp Props thay đổi:**
   - Khi bấm Toggle Theme, `color` đổi giữa `#000000` và `#ffffff`.
   - `React.memo` phát hiện props đổi -> `Title` render lại -> Terminal in ra dòng: `LOG Title render`.
2. **Trường hợp Props KHÔNG đổi (Chứng minh tối ưu):**
   - Đặt cố định `color="red"` cho `<Title text="My Daily Notes" color="red" />`.
   - Bấm nút Toggle Theme -> `HomeScreen` vẫn re-render, nhưng Terminal **không hề in ra dòng `Title render`**.
   - **Kết luận:** `React.memo` đã chặn thành công việc re-render lãng phí cho component con khi props không đổi.

---

### Bước 8: Performance Profiling (Profiler Tab)

#### Bước 8.1: Bắt đầu đo
1. Mở Cài đặt (⚙) -> Tab **Profiler** -> Tích chọn: ☑ **"Record why each component rendered while profiling."**
2. Chuyển sang tab **Profiler** -> Bấm nút tròn **Record**.
3. Bấm nút **Toggle Theme** 3 - 5 lần trên máy ảo.
4. Bấm nút tròn đỏ **Stop** để dừng đo.

#### Bước 8.2: Phân tích kết quả
1. **Commit Bar (`1 / 4 ← [||||] →`):**
   - Dải cột ở trên cùng thể hiện 4 lần render tương ứng với 4 lần bấm nút.
2. **Ranked Chart (`≡`):**
   - Danh sách các component sắp xếp theo thời gian render từ lâu nhất đến nhanh nhất (`Button`, `Title (Memo)`, `HomeScreen`, `ThemeProvider`...).
3. **Flamegraph (`🔥`):**
   - Biểu đồ cây: Thanh rộng thể hiện thời gian render lâu.
4. **Component Chart & "Why did this render?":**
   - Click đúp vào component `Title (Memo)`: Mở Component Chart thể hiện lịch sử render của riêng component đó qua các mốc thời gian (ví dụ: `5.3s for 1.6ms`, `8.2s for 1.3ms`...).
   - Mục **Why did this render?** chỉ rõ lý do:
     - Tại `HomeScreen`: **`Context changed`**.
     - Tại `Title`: **`Props changed: (color)`**.

---

## 2. Giai đoạn 2: Minh họa Context API qua nhiều cấp Component (Giải quyết Prop Drilling)

### 2.1 Vấn đề Prop Drilling & Giải pháp
- **Vấn đề (Prop Drilling):** Khi component ở cấp rất sâu (ví dụ nút Xóa/Hoàn thành ghi chú ở Cấp 3) cần thực hiện hành động làm thay đổi danh sách ở component gốc, nếu không dùng Context API, ta bắt buộc phải truyền các hàm callback (`onDelete`, `onToggle`) xuyên qua nhiều tầng component trung gian (`HomeScreen` → `NoteList` → `NoteItem` → `NoteActions`). Các component trung gian bị phụ thuộc vào những props mà chúng không hề sử dụng.
- **Giải pháp:** Sử dụng `NotesContext`. Bất kỳ component nào ở bất kỳ cấp độ nào (như `NoteActions` ở Cấp 3 hay `NoteStatsBadge` ở Cấp 2) đều có thể truy cập trực tiếp state và dispatch actions thông qua hook `useNotes()` mà không cần truyền props qua các cấp trung gian.

---

### 2.2 Cấu trúc cây Component (Component Tree)

```text
App (bọc ThemeProvider & NotesProvider)
 └── HomeScreen
      ├── Header
      │    ├── Title (Cấp 1 - bọc React.memo)
      │    ├── Button (Cấp 1 - Toggle Theme)
      │    └── NoteStatsBadge (Cấp 2 - Lấy trực tiếp { totalNotes, completedNotes } từ NotesContext)
      ├── NoteInput (Cấp 1 - Lấy trực tiếp { addNote } từ NotesContext)
      └── NoteList (Cấp 1 - Lấy { notes } từ NotesContext)
           └── NoteItem (Cấp 2 - Nhận prop { note }, KHÔNG nhận callback onDelete/onToggle)
                └── NoteActions (Cấp 3 - Lấy trực tiếp { deleteNote, toggleNote } từ NotesContext!)
```

#### Bảng so sánh luồng truyền dữ liệu:
| Tiêu chí | Khi chưa dùng Context (Prop Drilling) | Khi dùng Context API (`NotesContext`) |
| :--- | :--- | :--- |
| **Component gốc (`HomeScreen`)** | Phải quản lý state `notes`, viết `addNote`, `deleteNote`, `toggleNote` rồi truyền xuống | Chỉ đóng vai trò bố cục, không cần truyền prop callbacks |
| **Component trung gian (`NoteList`, `NoteItem`)** | Phải nhận props `onDelete`, `onToggle` chỉ để chuyển tiếp xuống con | Hoàn toàn sạch sẽ, `NoteItem` chỉ nhận duy nhất object `note` để hiển thị |
| **Component lá (`NoteActions` - Cấp 3)** | Nhận hàm từ component cha | Gọi trực tiếp `const { deleteNote, toggleNote } = useNotes()` |
| **Nhánh ngang (`NoteStatsBadge`)** | Phải phụ thuộc `HomeScreen` tính toán và truyền props | Tự động đọc và re-render theo state chung của Context |

---

### 2.3 Hướng dẫn quan sát trên React DevTools

1. **Kiểm tra cây Components:**
   - Mở React DevTools, quan sát cấu trúc cây:
     `App` → `ThemeProvider` → `NotesProvider` → `HomeScreen` → `NoteList` → `NoteItem` → `NoteActions`.
2. **Kiểm tra Hook Context tại Component Cấp 3 (`NoteActions`):**
   - Click chọn một component `NoteActions` bất kỳ trong danh sách.
   - Nhìn sang panel bên phải mục **hooks**:
     Hiển thị rõ hook `Notes` chứa `{ deleteNote, toggleNote }`.
   - Click nút **"✓ Xong"** hoặc **"✕ Xóa"**:
     - `NoteActions` kích hoạt action trực tiếp lên `NotesProvider`.
     - `NoteStatsBadge` ở nhánh trên tự động cập nhật số lượng ghi chú hoàn thành/tổng số mà không cần truyền dữ liệu ngược lên qua props!

