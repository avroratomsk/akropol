from .settings import BASE_DIR

INSTALLED_APPS = [
    # "django.contrib.admin",
    "admin",
    'accounts',
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'ckeditor',
    'ckeditor_uploader',
    "debug_toolbar",
    # "corsheaders",
    'sorl.thumbnail',
    'django.contrib.sitemaps',
    "home",
    "shop",
    # "coupons",
    "users",
    "reviews",
    "service",
    'django_recaptcha',
    "cart",
    "order",
    "payment",
    "subdomain",
    'allauth',
    'allauth.account',
    # 'tinymce',
    "blog",
    # "news",
#     "django.contrib.sitemaps",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    'whitenoise.middleware.WhiteNoiseMiddleware',
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    'allauth.account.middleware.AccountMiddleware',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}