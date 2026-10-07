/**
 * Hàm phân nhóm và sắp xếp danh sách danh bạ theo chữ cái đầu tiên (A-Z)
 * @param {Array} contacts - Mảng các đối tượng liên hệ
 * @returns {Array} Mảng các section cho SectionList: [{ title: 'A', data: [...] }, ...]
 */
export const groupByAlphabet = (contacts) => {
    if (!contacts || contacts.length === 0) {
        return [];
    }

    // 1. Nhóm danh bạ theo ký tự đầu tiên của tên
    const groups = {};

    contacts.forEach((contact) => {
        const name = (contact.name || '').trim();
        if (!name) return;

        // Lấy ký tự đầu tiên và viết hoa
        let firstLetter = name[0].toUpperCase();

        // Nếu không thuộc bảng chữ cái A-Z thì đưa vào nhóm '#'
        if (!/^[A-Z]$/.test(firstLetter)) {
            firstLetter = '#';
        }

        if (!groups[firstLetter]) {
            groups[firstLetter] = [];
        }
        groups[firstLetter].push(contact);
    });

    // 2. Chuyển đổi thành mảng các section và sắp xếp
    const sortedSections = Object.keys(groups)
        .sort((a, b) => {
            if (a === '#') return 1;
            if (b === '#') return -1;
            return a.localeCompare(b);
        })
        .map((letter) => ({
            title: letter,
            // Sắp xếp các liên hệ bên trong từng section theo tên A-Z
            data: groups[letter].sort((a, b) =>
                (a.name || '').localeCompare(b.name || '', 'vi', { sensitivity: 'base' })
            ),
        }));

    return sortedSections;
};

