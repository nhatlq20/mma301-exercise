// Hàm để lọc ghi chú dựa trên truy vấn tìm kiếm

export const filterNotesBySearch = (notes, query) => {
    // Nếu truy vấn tìm kiếm rỗng hoặc chỉ chứa khoảng trắng, trả về tất cả các ghi chú
    if (!query || !query.trim()) return notes;
    const lowerQuery = query.toLowerCase().trim();
    // Lọc các ghi chú mà tiêu đề hoặc nội dung chứa truy vấn tìm kiếm (không phân biệt chữ hoa chữ thường)
    return notes.filter(
        (note) =>
            note.title.toLowerCase().includes(lowerQuery) ||
            note.content.toLowerCase().includes(lowerQuery)
    );
};
// Hàm để sắp xếp các ghi chú theo ngày cập nhật (updatedAt) từ mới nhất đến cũ nhất
export const sortNotesByUpdatedAt = (notes) => {
    return [...notes].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
};