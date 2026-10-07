// services/newsService.js

// Khóa API nếu sử dụng NewsAPI (để trống nếu sử dụng Mock data)
const NEWS_API_KEY = '';
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

// Dữ liệu Mock ban đầu cho các chuyên mục: technology, health, sports
const INITIAL_MOCK_NEWS = [
    // Chuyên mục Technology
    {
        id: 'tech-1',
        title: 'Mô hình AI mới đạt kỷ lục về hiệu suất và khả năng xử lý ngôn ngữ',
        description: 'Các tiến bộ vượt bậc trong kiến trúc transformer giúp AI xử lý ngữ cảnh dài hơn với độ chính xác cao.',
        category: 'technology',
        source: 'VnExpress Số Hóa',
        publishedAt: '08:30 Hôm nay',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
    },
    {
        id: 'tech-2',
        title: 'React Native nâng cấp kiến trúc mới tối ưu tốc độ render UI',
        description: 'Kiến trúc Fabric và TurboModules giúp các ứng dụng đa nền tảng đạt trải nghiệm mượt mà gần như Native.',
        category: 'technology',
        source: 'Tech Insider',
        publishedAt: '07:45 Hôm nay',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80',
    },
    {
        id: 'tech-3',
        title: 'Chip xử lý tiến trình 2nm sắp được thương mại hóa trên thiết bị di động',
        description: 'Các hãng bán dẫn hàng đầu công bố kế hoạch đưa chip vi mô thế hệ tiếp theo vào smartphone.',
        category: 'technology',
        source: 'GenK',
        publishedAt: 'Hôm qua',
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80',
    },

    // Chuyên mục Health
    {
        id: 'health-1',
        title: '5 thói quen hằng ngày giúp bảo vệ và tăng cường sức khỏe tim mạch',
        description: 'Duy trì chế độ ăn nhiều chất xơ, đi bộ đều đặn và ngủ đủ giấc giúp giảm đáng kể nguy cơ đột quỵ.',
        category: 'health',
        source: 'Sức Khỏe Đời Sống',
        publishedAt: '09:00 Hôm nay',
        imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&q=80',
    },
    {
        id: 'health-2',
        title: 'Giấc ngủ sâu ảnh hưởng thế nào đến hệ thống miễn dịch tự nhiên?',
        description: 'Nghiên cứu mới chỉ ra giấc ngủ đủ từ 7-8 tiếng kích hoạt tái tạo tế bào lympho bảo vệ cơ thể.',
        category: 'health',
        source: 'Healthline',
        publishedAt: '06:15 Hôm nay',
        imageUrl: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?w=500&q=80',
    },
    {
        id: 'health-3',
        title: 'Những lưu ý quan trọng khi bổ sung vitamin và khoáng chất',
        description: 'Không nên lạm dụng thực phẩm chức năng khi chưa có sự tư vấn từ chuyên gia dinh dưỡng.',
        category: 'health',
        source: 'Medical News',
        publishedAt: 'Hôm qua',
        imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80',
    },

    // Chuyên mục Sports
    {
        id: 'sports-1',
        title: 'Vòng bảng Champions League: Kịch tính đến những phút bù giờ cuối cùng',
        description: 'Các đội bóng hàng đầu châu Âu tiếp tục mang lại những màn rượt đuổi tỷ số ngoạn mục.',
        category: 'sports',
        source: 'Thể Thao 24/7',
        publishedAt: '10:00 Hôm nay',
        imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&q=80',
    },
    {
        id: 'sports-2',
        title: 'Giải chạy Marathon quốc tế thu hút hàng nghìn vận động viên tranh tài',
        description: 'Tinh thần thể thao lan tỏa mạnh mẽ với sự tham gia của các chân chạy phong trào và chuyên nghiệp.',
        category: 'sports',
        source: 'Tuổi Trẻ Thể Thao',
        publishedAt: '07:20 Hôm nay',
        imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=80',
    },
    {
        id: 'sports-3',
        title: 'Kỷ lục bơi lội thế giới mới được thiết lập tại giải vô địch mở rộng',
        description: 'Vận động viên trẻ gây bất ngờ khi xô đổ kỷ lục tồn tại hơn 4 năm ở cự ly 100m tự do.',
        category: 'sports',
        source: 'Báo Thể Thao',
        publishedAt: 'Hôm qua',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80',
    },
];

/**
 * Lấy danh sách tin tức (hỗ trợ NewsAPI qua fetch hoặc Mock data)
 * @param {boolean} isRefresh - Cờ xác định kéo để làm mới
 * @returns {Promise<Array>} Danh sách tin tức thô
 */
export const fetchNews = async (isRefresh = false) => {
    try {
        // Nếu có API key, gọi API thực tế bằng fetch
        if (NEWS_API_KEY) {
            const categories = ['technology', 'health', 'sports'];
            const requests = categories.map(async (category) => {
                const url = `${NEWS_API_URL}?country=us&category=${category}&apiKey=${NEWS_API_KEY}`;
                const response = await fetch(url);
                const data = await response.json();
                if (data.status === 'ok' && data.articles) {
                    return data.articles.map((art, index) => ({
                        id: `${category}-${index}-${Date.now()}`,
                        title: art.title || 'Không có tiêu đề',
                        description: art.description || '',
                        category: category,
                        source: art.source?.name || 'NewsAPI',
                        publishedAt: art.publishedAt ? new Date(art.publishedAt).toLocaleTimeString() : 'Mới đây',
                        imageUrl: art.urlToImage || 'https://picsum.photos/200/120',
                    }));
                }
                return [];
            });

            const results = await Promise.all(requests);
            return results.flat();
        }

        // Giả lập độ trễ mạng khi dùng fetch / mock data
        await new Promise((resolve) => setTimeout(resolve, 800));

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeFormatted = `${hours}:${minutes}:${seconds}`;

        if (isRefresh) {
            // Khi kéo xuống làm mới, cập nhật thời gian và bổ sung tin tức mới
            const refreshedItem = {
                id: `refresh-${Date.now()}`,
                title: `[MỚI] Bản tin cập nhật lúc ${timeFormatted}`,
                description: 'Tin tức vừa được hệ thống tự động tải và làm mới thành công.',
                category: 'technology',
                source: 'Hệ thống',
                publishedAt: `Vừa cập nhật (${timeFormatted})`,
                imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&q=80',
            };

            return [
                refreshedItem,
                ...INITIAL_MOCK_NEWS.map((item) => ({
                    ...item,
                    publishedAt: `Cập nhật lúc ${timeFormatted}`,
                })),
            ];
        }

        return INITIAL_MOCK_NEWS;
    } catch (error) {
        console.error('Lỗi khi fetch dữ liệu tin tức:', error);
        return [];
    }
};

/**
 * Phân chia dữ liệu tin tức thô theo các category thành cấu trúc SectionList
 * @param {Array} newsList - Mảng tin tức thô
 * @returns {Array} Mảng các section cho SectionList: [{ title, data: [...] }]
 */
export const groupNewsByCategory = (newsList) => {
    if (!newsList || newsList.length === 0) {
        return [];
    }

    const categories = [
        { key: 'technology', title: 'Technology' },
        { key: 'health', title: 'Health' },
        { key: 'sports', title: 'Sports' },
    ];

    const sections = categories.map((cat) => {
        const filteredData = newsList.filter(
            (item) => item.category && item.category.toLowerCase() === cat.key.toLowerCase()
        );
        return {
            title: cat.title,
            data: filteredData,
        };
    });

    // Chỉ giữ lại các section có dữ liệu
    return sections.filter((section) => section.data.length > 0);
};

