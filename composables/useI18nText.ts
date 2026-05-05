type Locale = 'ja' | 'en' | 'vi'

type MessageTree = Record<string, string | MessageTree>

const messages: Record<Locale, MessageTree> = {
  ja: {
    app: {
      name: 'サンシャインテレコムイベント',
      subtitle: '',
      tagline: 'Sunshine Telecom のイベント管理をシンプルに'
    },
    nav: {
      home: 'ホーム',
      user: 'ユーザー',
      admin: '管理者',
      userLogin: 'ユーザーログイン',
      adminLogin: '管理者ログイン',
      language: '言語'
    },
    common: {
      email: 'Gmail',
      password: 'パスワード',
      logout: 'ログアウト',
      continue: '続行',
      secureArea: 'セキュアエリア',
      backHome: 'ホームへ戻る'
    },
    home: {
      title: '役割を選択して Sunshine Telecom イベントへ',
      description: '参加者ユーザーと運営管理者の入口を分け、安全にイベント情報へアクセスできます。',
      userCardTitle: '参加者ポータル',
      userCardDesc: 'Gmail でログインして、イベントスケジュールとお知らせを確認。',
      adminCardTitle: '運営ポータル',
      adminCardDesc: '正しい Gmail とパスワードでイベント管理機能へアクセス。',
      ctaUser: '参加者として入る',
      ctaAdmin: '運営として入る'
    },
    auth: {
      userLoginTitle: 'ユーザーログイン',
      userLoginDesc: 'Gmail を入力するだけでユーザーページにアクセスできます。',
      adminLoginTitle: '管理者ログイン',
      adminLoginDesc: '管理者ページは Gmail とパスワードの両方が必要です。',
      userWelcome: 'ようこそ、{email} さん',
      adminWelcome: '管理者としてログイン中: {email}',
      invalidEmail: '有効な Gmail アドレスを入力してください。',
      invalidAdminCredential: 'Gmail またはパスワードが正しくありません。',
      requiredPassword: 'パスワードを入力してください。'
    },
    userPage: {
      title: '参加者ダッシュボード',
      description: 'Sunshine Telecom イベントの最新情報をここで確認できます。',
      panelOneTitle: '本日のイベント',
      panelOneBody: '本日参加するセッションと会場情報を確認しましょう。',
      panelTwoTitle: '通知',
      panelTwoBody: '運営からの最新アナウンスを確認できます。'
    },
    adminPage: {
      title: 'イベント運営ダッシュボード',
      description: 'Sunshine Telecom イベントの運営状況と参加者アクセスを管理します。',
      panelOneTitle: 'イベント状態',
      panelOneBody: '主要セッションと受付システムは正常に稼働しています。',
      panelTwoTitle: '参加者監査',
      panelTwoBody: '最新のログイン履歴と管理操作を確認できます。'
    },
    footer: {
      rights: 'Sunshine Telecom. All rights reserved.',
      note: 'イベント運営向けの明るいデザイン・安全なアクセス・多言語対応',
      description: 'プレミアムテクノロジー製品を驚きの価格でご提供する、透明性と公平性を兼ね備えたトップイベントプラットフォーム。',
      jpTitle: '日本本社',
      jpAddress: '〒335-0002 埼玉県蕨市塚越1-2-14 花見第3ビル5階',
      jpPhone: '048-420-6088',
      jpEmail: 'ss@sunshineglobal.co.jp',
      jpTax: '登録番号: 9030001136641',
      jpIssued: '発行日: 2020年5月28日（国税庁）',
      vnTitle: 'ベトナム事務所',
      vnAddress: 'ハノイ市ドンダー区タイハー通り151B路地29番地',
      vnPhone: '048-420-6088',
      vnEmail: 'ss@sunshineglobal.co.jp',
      vnTax: '税務番号: 0110257142',
      vnIssued: '発行日: 2023年2月20日（ハノイ市計画投資局）'
    }
  },
  en: {
    app: {
      name: 'Sunshine Telecom Event',
      subtitle: '',
      tagline: 'Simple event management for Sunshine Telecom'
    },
    nav: {
      home: 'Home',
      user: 'User',
      admin: 'Admin',
      userLogin: 'User Login',
      adminLogin: 'Admin Login',
      language: 'Language'
    },
    common: {
      email: 'Gmail',
      password: 'Password',
      logout: 'Log out',
      continue: 'Continue',
      secureArea: 'Secure Area',
      backHome: 'Back to Home'
    },
    home: {
      title: 'Choose a role for Sunshine Telecom Event',
      description: 'Participant and admin entrances are separated for secure event access.',
      userCardTitle: 'Participant Portal',
      userCardDesc: 'Log in with Gmail to view event schedules and announcements.',
      adminCardTitle: 'Operations Portal',
      adminCardDesc: 'Use the correct Gmail and password for event management tools.',
      ctaUser: 'Enter as Participant',
      ctaAdmin: 'Enter as Admin'
    },
    auth: {
      userLoginTitle: 'User Login',
      userLoginDesc: 'Enter only your Gmail to access the user page.',
      adminLoginTitle: 'Admin Login',
      adminLoginDesc: 'Admin page requires both Gmail and password.',
      userWelcome: 'Welcome, {email}',
      adminWelcome: 'Signed in as admin: {email}',
      invalidEmail: 'Please enter a valid Gmail address.',
      invalidAdminCredential: 'Incorrect Gmail or password.',
      requiredPassword: 'Please enter your password.'
    },
    userPage: {
      title: 'Participant Dashboard',
      description: 'See the latest Sunshine Telecom event updates here.',
      panelOneTitle: 'Today\'s Sessions',
      panelOneBody: 'Review your upcoming sessions and venue details.',
      panelTwoTitle: 'Notifications',
      panelTwoBody: 'Check the latest announcements from the event team.'
    },
    adminPage: {
      title: 'Event Admin Dashboard',
      description: 'Manage Sunshine Telecom event status and participant access.',
      panelOneTitle: 'Event Status',
      panelOneBody: 'Core sessions and check-in services are running normally.',
      panelTwoTitle: 'Participant Audit',
      panelTwoBody: 'Review recent logins and administrative actions.'
    },
    footer: {
      rights: 'Sunshine Telecom. All rights reserved.',
      note: 'Bright design, secure access, multilingual support for event operations',
      description: 'The leading event platform offering premium tech products at unbeatable prices. Transparent, fair, and thrilling.',
      jpTitle: 'Japan Headquarters',
      jpAddress: '1-2-14 Tsukagoshi, Warabi, Saitama 335-0002, 5F Hanami Bldg. No.3',
      jpPhone: '048-420-6088',
      jpEmail: 'ss@sunshineglobal.co.jp',
      jpTax: 'Tax No.: 9030001136641',
      jpIssued: 'Issued: 28/05/2020 by National Tax Agency',
      vnTitle: 'Vietnam Office',
      vnAddress: 'No. 29, Alley 151B Thai Ha, Dong Da District, Hanoi',
      vnPhone: '048-420-6088',
      vnEmail: 'ss@sunshineglobal.co.jp',
      vnTax: 'Tax No.: 0110257142',
      vnIssued: 'Issued: 20/02/2023 by Hanoi Dept. of Planning & Investment'
    }
  },
  vi: {
    app: {
      name: 'Sự kiện Sunshine Telecom',
      subtitle: '',
      tagline: 'Quản lý sự kiện Sunshine Telecom một cách đơn giản'
    },
    nav: {
      home: 'Trang chủ',
      user: 'Người dùng',
      admin: 'Quản trị',
      userLogin: 'Đăng nhập User',
      adminLogin: 'Đăng nhập Admin',
      language: 'Ngôn ngữ'
    },
    common: {
      email: 'Gmail',
      password: 'Mật khẩu',
      logout: 'Đăng xuất',
      continue: 'Tiếp tục',
      secureArea: 'Khu vực bảo mật',
      backHome: 'Về trang chủ'
    },
    home: {
      title: 'Chọn vai trò cho sự kiện Sunshine Telecom',
      description: 'Tách cổng người tham gia và quản trị để truy cập sự kiện an toàn.',
      userCardTitle: 'Cổng Người Tham Gia',
      userCardDesc: 'Đăng nhập Gmail để xem lịch sự kiện và thông báo mới nhất.',
      adminCardTitle: 'Cổng Vận Hành',
      adminCardDesc: 'Dùng đúng Gmail và mật khẩu để quản trị sự kiện.',
      ctaUser: 'Vào với Người Tham Gia',
      ctaAdmin: 'Vào với Quản Trị'
    },
    auth: {
      userLoginTitle: 'Đăng nhập User',
      userLoginDesc: 'Chỉ cần nhập Gmail để truy cập trang user.',
      adminLoginTitle: 'Đăng nhập Admin',
      adminLoginDesc: 'Trang admin yêu cầu cả Gmail và mật khẩu.',
      userWelcome: 'Xin chào, {email}',
      adminWelcome: 'Đang đăng nhập quản trị: {email}',
      invalidEmail: 'Vui lòng nhập Gmail hợp lệ.',
      invalidAdminCredential: 'Gmail hoặc mật khẩu không đúng.',
      requiredPassword: 'Vui lòng nhập mật khẩu.'
    },
    userPage: {
      title: 'Dashboard Người Tham Gia',
      description: 'Theo dõi các cập nhật mới nhất của sự kiện Sunshine Telecom tại đây.',
      panelOneTitle: 'Phiên hôm nay',
      panelOneBody: 'Xem các phiên sắp diễn ra và thông tin địa điểm.',
      panelTwoTitle: 'Thông báo',
      panelTwoBody: 'Xem các thông báo mới nhất từ ban tổ chức.'
    },
    adminPage: {
      title: 'Dashboard Quản Trị Sự Kiện',
      description: 'Quản lý tình trạng sự kiện Sunshine Telecom và quyền truy cập người tham gia.',
      panelOneTitle: 'Trạng thái sự kiện',
      panelOneBody: 'Các phiên chính và hệ thống check-in đang hoạt động ổn định.',
      panelTwoTitle: 'Kiểm toán người tham gia',
      panelTwoBody: 'Theo dõi lịch sử đăng nhập và thao tác quản trị mới nhất.'
    },
    footer: {
      rights: 'Sunshine Telecom. Bảo lưu mọi quyền.',
      note: 'Thiết kế sáng sủa, truy cập bảo mật, hỗ trợ đa ngôn ngữ cho vận hành sự kiện',
      description: 'Nền tảng sự kiện hàng đầu, mang đến cơ hội sở hữu các sản phẩm công nghệ cao cấp với mức giá không tưởng. Minh bạch, công bằng và đầy kịch tính.',
      jpTitle: 'Trụ sở Nhật Bản',
      jpAddress: '335-0002 Tầng 5, Tòa nhà Hanami số 3, 1-2-14 Tsukagoshi, Warabi, Saitama',
      jpPhone: '048-420-6088',
      jpEmail: 'ss@sunshineglobal.co.jp',
      jpTax: 'MST: 9030001136641',
      jpIssued: 'Cấp ngày: 28/05/2020 bởi Cơ quan thuế quốc gia',
      vnTitle: 'Văn phòng Việt Nam',
      vnAddress: 'Số 29 ngõ 151B Thái Hà, phường Đống Đa, Thành phố Hà Nội',
      vnPhone: '048-420-6088',
      vnEmail: 'ss@sunshineglobal.co.jp',
      vnTax: 'MST: 0110257142',
      vnIssued: 'Cấp ngày: 20/02/2023 bởi Sở KH&ĐT TP. Hà Nội'
    }
  }
}

function readPath(tree: MessageTree, path: string): string | undefined {
  return path.split('.').reduce<string | MessageTree | undefined>((acc, segment) => {
    if (!acc || typeof acc === 'string') {
      return undefined
    }

    return acc[segment]
  }, tree) as string | undefined
}

export function useI18nText() {
  const localeCookie = useCookie<Locale>('locale', {
    default: () => 'ja',
    sameSite: 'lax'
  })

  const locale = useState<Locale>('locale', () => localeCookie.value ?? 'ja')

  watch(locale, (nextLocale) => {
    localeCookie.value = nextLocale
  })

  const localeOptions = [
    { value: 'ja' as Locale, label: '日本語', flag: '/nhat.png' },
    { value: 'en' as Locale, label: 'English', flag: '/anh.png' },
    { value: 'vi' as Locale, label: 'Tiếng Việt', flag: '/viet.png' }
  ]

  const t = (key: string, params: Record<string, string> = {}) => {
    const text = readPath(messages[locale.value], key) ?? readPath(messages.ja, key) ?? key

    return Object.entries(params).reduce((result, [paramKey, paramValue]) => {
      return result.replaceAll(`{${paramKey}}`, paramValue)
    }, text)
  }

  const setLocale = (nextLocale: Locale) => {
    locale.value = nextLocale
  }

  return {
    locale,
    localeOptions,
    setLocale,
    t
  }
}
