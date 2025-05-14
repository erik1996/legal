import { QuestionOption } from '../entities/question-option.entity';
import { AppDataSource } from '../lib/data-source';

const translations = [
  {
    option: 'National Law',
    option_arm: 'Ազգային օրենսդրություն',
    option_rus: 'Национальное право',
    option_ara: 'القانون الوطني',
  },
  {
    option: 'Regional / State Law',
    option_arm: 'Մարզային / նահանգային օրենսդրություն',
    option_rus: 'Региональное / Государственное право',
    option_ara: 'القانون الإقليمي / قانون الولاية',
  },
  {
    option: 'Municipal / Local Law',
    option_arm: 'Համայնքային / տեղական օրենսդրություն',
    option_rus: 'Муниципальное / Местное право',
    option_ara: 'القانون المحلي / البلدي',
  },
  {
    option: 'EU / EEA Law',
    option_arm: 'ԵՄ / ԵՏՏ օրենսդրություն',
    option_rus: 'Право ЕС / ЕЭП',
    option_ara: 'قانون الاتحاد الأوروبي / المنطقة الاقتصادية الأوروبية',
  },
  {
    option: 'International Law / Treaty-Based Law',
    option_arm: 'Միջազգային / պայմանագրային օրենսդրություն',
    option_rus: 'Международное право / Договорное право',
    option_ara: 'القانون الدولي / القانون القائم على المعاهدات',
  },
  {
    option: 'Not Jurisdiction-Specific',
    option_arm: 'Ոչ իրավասությանը հատուկ',
    option_rus: 'Не относится к юрисдикции',
    option_ara: 'غير متعلق باختصاص قضائي معين',
  },
  {
    option: 'Family Law',
    option_arm: 'Ընտանեկան իրավունք',
    option_rus: 'Семейное право',
    option_ara: 'قانون الأسرة',
  },
  {
    option: 'Property / Real Estate Law',
    option_arm: 'Գույքի / անշարժ գույքի իրավունք',
    option_rus: 'Имущественное / недвижимое право',
    option_ara: 'قانون الملكية / العقارات',
  },
  {
    option: 'Employment / Labour Law',
    option_arm: 'Աշխատանքային իրավունք',
    option_rus: 'Трудовое право',
    option_ara: 'قانون العمل / التوظيف',
  },
  {
    option: 'Company / Corporate Law',
    option_arm: 'Ընկերությունների / կորպորատիվ իրավունք',
    option_rus: 'Корпоративное право',
    option_ara: 'قانون الشركات / الشركات',
  },
  {
    option: 'Contract Law',
    option_arm: 'Պայմանագրային իրավունք',
    option_rus: 'Договорное право',
    option_ara: 'قانون العقود',
  },
  {
    option: 'Criminal Law',
    option_arm: 'Քրեական իրավունք',
    option_rus: 'Уголовное право',
    option_ara: 'القانون الجنائي',
  },
  {
    option: 'Immigration / Residency Law',
    option_arm: 'Ներգաղթի / բնակության իրավունք',
    option_rus: 'Иммиграционное / вид на жительство',
    option_ara: 'قانون الهجرة / الإقامة',
  },
  {
    option: 'Personal Injury / Compensation Law',
    option_arm: 'Անձնական վնասվածքների / փոխհատուցման իրավունք',
    option_rus: 'Право о телесных повреждениях / компенсации',
    option_ara: 'قانون الإصابات الشخصية / التعويضات',
  },
  {
    option: 'Intellectual Property Law',
    option_arm: 'Ինտելեկտուալ սեփականության իրավունք',
    option_rus: 'Право интеллектуальной собственности',
    option_ara: 'قانون الملكية الفكرية',
  },
  {
    option: 'Consumer Protection Law',
    option_arm: 'Սպառողների իրավունքների պաշտպանություն',
    option_rus: 'Закон о защите прав потребителей',
    option_ara: 'قانون حماية المستهلك',
  },
  {
    option: 'Taxation Law',
    option_arm: 'Հարկային իրավունք',
    option_rus: 'Налоговое право',
    option_ara: 'قانون الضرائب',
  },
  {
    option: 'Wills / Inheritance / Estate Planning',
    option_arm: 'Կտակներ / ժառանգություն / գույքի պլանավորում',
    option_rus: 'Завещания / наследство / управление имуществом',
    option_ara: 'الوصايا / الميراث / تخطيط التركات',
  },
  {
    option: 'Bankruptcy / Insolvency Law',
    option_arm: 'Սնանկության իրավունք',
    option_rus: 'Банкротство / неплатежеспособность',
    option_ara: 'قانون الإفلاس / الإعسار',
  },
  {
    option: 'Civil Rights / Human Rights',
    option_arm: 'Քաղաքացիական / Մարդու իրավունքներ',
    option_rus: 'Гражданские / права человека',
    option_ara: 'الحقوق المدنية / حقوق الإنسان',
  },
  {
    option: 'Administrative Law',
    option_arm: 'Վարչական իրավունք',
    option_rus: 'Административное право',
    option_ara: 'القانون الإداري',
  },
  {
    option: 'Insurance Law',
    option_arm: 'Ապահովագրական իրավունք',
    option_rus: 'Страховое право',
    option_ara: 'قانون التأمين',
  },
  {
    option: 'Healthcare / Medical Law',
    option_arm: 'Առողջապահության / բժշկական իրավունք',
    option_rus: 'Медицинское право',
    option_ara: 'قانون الرعاية الصحية / الطب',
  },
  {
    option: 'Environmental Law',
    option_arm: 'Բնապահպանական իրավունք',
    option_rus: 'Экологическое право',
    option_ara: 'قانون البيئة',
  },
  {
    option: 'Education Law',
    option_arm: 'Կրթության իրավունք',
    option_rus: 'Право на образование',
    option_ara: 'قانون التعليم',
  },
  {
    option: 'Technology / Data Protection (e.g., GDPR)',
    option_arm: 'Տեխնոլոգիա / Տվյալների պաշտպանություն (օրինակ՝ GDPR)',
    option_rus: 'Технологии / Защита данных (например, GDPR)',
    option_ara: 'التكنولوجيا / حماية البيانات (مثل GDPR)',
  },
  {
    option: 'Public International Law (for cross-border cases)',
    option_arm: 'Հանրային միջազգային իրավունք (սահմանային դեպքերի համար)',
    option_rus: 'Международное публичное право (для трансграничных дел)',
    option_ara: 'القانون الدولي العام (للحالات العابرة للحدود)',
  },
  {
    option: 'Other',
    option_arm: 'Այլ',
    option_rus: 'Другое',
    option_ara: 'أخرى',
  },
  {
    option: 'Requesting factual information',
    option_arm: 'Փաստական տեղեկատվության հարցում',
    option_rus: 'Запрос фактической информации',
    option_ara: 'طلب معلومات واقعية',
  },
  {
    option: 'Understanding legal rights or obligations',
    option_arm: 'Իրավական իրավունքների կամ պարտականությունների ըմբռնում',
    option_rus: 'Понимание прав или обязанностей',
    option_ara: 'فهم الحقوق أو الالتزامات القانونية',
  },
  {
    option: 'Analyzing a specific scenario',
    option_arm: 'Սպեցիֆիկ սցենարի վերլուծություն',
    option_rus: 'Анализ конкретной ситуации',
    option_ara: 'تحليل سيناريو محدد',
  },
  {
    option: 'Understanding a legal document',
    option_arm: 'Իրավական փաստաթղթի ըմբռնում',
    option_rus: 'Понимание юридического документа',
    option_ara: 'فهم وثيقة قانونية',
  },
  {
    option: 'Finding legal resources',
    option_arm: 'Իրավական ռեսուրսների որոնում',
    option_rus: 'Поиск юридических ресурсов',
    option_ara: 'البحث عن موارد قانونية',
  },
  {
    option: 'Procedural question (how to file/submit/apply)',
    option_arm: 'Գործընթացային հարց (ինչպես ներկայացնել)',
    option_rus: 'Процессуальный вопрос (как подать)',
    option_ara: 'سؤال إجرائي (كيفية التقديم / التقديم)',
  },
  {
    option: 'Legal deadline question',
    option_arm: 'Իրավական վերջնաժամկետի հարց',
    option_rus: 'Вопрос о юридическом сроке',
    option_ara: 'سؤال عن الموعد النهائي القانوني',
  },
  {
    option: 'Comparing legal options',
    option_arm: 'Իրավական ընտրանքների համեմատություն',
    option_rus: 'Сравнение юридических вариантов',
    option_ara: 'مقارنة الخيارات القانونية',
  },
  {
    option: 'Verifying the legality of an action',
    option_arm: 'Գործողության օրինականության ստուգում',
    option_rus: 'Проверка законности действия',
    option_ara: 'التحقق من شرعية الإجراء',
  },

  {
    option: 'Basic information request',
    option_arm: 'Հիմնական տեղեկատվության հարցում',
    option_rus: 'Запрос базовой информации',
    option_ara: 'طلب معلومات أساسية',
  },
  {
    option: 'Scenario requiring analysis',
    option_arm: 'Վերլուծության պահանջող սցենար',
    option_rus: 'Сценарий, требующий анализа',
    option_ara: 'سيناريو يتطلب التحليل',
  },
  {
    option: 'Complex situation with multiple factors',
    option_arm: 'Բազմաթիվ գործոններով բարդ իրավիճակ',
    option_rus: 'Сложная ситуация с несколькими факторами',
    option_ara: 'وضع معقد بعوامل متعددة',
  },
  {
    option: 'Individual / Consumer',
    option_arm: 'Անհատ / Սպառող',
    option_rus: 'Физическое лицо / Потребитель',
    option_ara: 'فرد / مستهلك',
  },
  {
    option: 'Employee / Worker',
    option_arm: 'Աշխատող',
    option_rus: 'Сотрудник / Работник',
    option_ara: 'موظف / عامل',
  },
  {
    option: 'Employer / Company Representative',
    option_arm: 'Գործատու / Ընկերության ներկայացուցիչ',
    option_rus: 'Работодатель / Представитель компании',
    option_ara: 'صاحب عمل / ممثل شركة',
  },
  {
    option: 'Landlord',
    option_arm: 'Տանտեր',
    option_rus: 'Арендодатель',
    option_ara: 'مالك العقار',
  },
  {
    option: 'Tenant',
    option_arm: 'Վարձակալ',
    option_rus: 'Арендатор',
    option_ara: 'المستأجر',
  },
  {
    option: 'Family Member',
    option_arm: 'Ընտանիքի անդամ',
    option_rus: 'Член семьи',
    option_ara: 'أحد أفراد العائلة',
  },
  {
    option: 'Student',
    option_arm: 'Ուսանող',
    option_rus: 'Студент',
    option_ara: 'طالب',
  },
  {
    option: 'Healthcare Patient',
    option_arm: 'Բուժառու',
    option_rus: 'Пациент',
    option_ara: 'مريض',
  },
  {
    option: 'Professional (e.g., doctor, architect)',
    option_arm: 'Մասնագետ (օր.՝ բժիշկ, ճարտարապետ)',
    option_rus: 'Профессионал (напр., врач, архитектор)',
    option_ara: 'مهني (مثل الطبيب أو المهندس المعماري)',
  },
  {
    option: 'Creditor',
    option_arm: 'Վարկատու',
    option_rus: 'Кредитор',
    option_ara: 'الدائن',
  },
  {
    option: 'Debtor',
    option_arm: 'Պարտատեր',
    option_rus: 'Должник',
    option_ara: 'المدين',
  },
  {
    option: 'Victim of harm or rights violation',
    option_arm: 'Վնաս կրած կամ իրավունքի խախտման զոհ',
    option_rus: 'Жертва вреда или нарушения прав',
    option_ara: 'ضحية ضرر أو انتهاك للحقوق',
  },
  {
    option: 'Accused / Defendant',
    option_arm: 'Մեղադրյալ / Պաշտպանվող',
    option_rus: 'Обвиняемый / Подсудимый',
    option_ara: 'المتهم / المدعى عليه',
  },
  {
    option: 'Contractor / Freelancer',
    option_arm: 'Մատակարար / Ազատ մասնագետ',
    option_rus: 'Подрядчик / Фрилансер',
    option_ara: 'مقاول / مستقل',
  },
  {
    option: 'Government Official / Public Authority (Europe-specific cases)',
    option_arm: 'Պաշտոնյա / Պետական մարմին (Եվրոպայի դեպքերում)',
    option_rus: 'Госслужащий / Государственный орган (для Европы)',
    option_ara: 'مسؤول حكومي / سلطة عامة (لحالات أوروبا)',
  },
  {
    option: 'NGO / Civil Society Representative',
    option_arm: 'ՀԿ / Քաղաքացիական հասարակության ներկայացուցիչ',
    option_rus: 'НПО / Представитель гражданского общества',
    option_ara: 'منظمة غير حكومية / ممثل المجتمع المدني',
  },
  {
    option: 'Contract / Agreement',
    option_arm: 'Պայմանագիր',
    option_rus: 'Контракт / Соглашение',
    option_ara: 'عقد / اتفاق',
  },
  {
    option: 'Court Order / Filing',
    option_arm: 'Դատարանի որոշում / ներկայացում',
    option_rus: 'Судебный приказ / Поданное дело',
    option_ara: 'أمر / تقديم للمحكمة',
  },
  {
    option: 'Government Form / Permit',
    option_arm: 'Պետական ձև / թույլտվություն',
    option_rus: 'Государственная форма / Разрешение',
    option_ara: 'نموذج / تصريح حكومي',
  },
  {
    option: 'Immigration Document (Visa, Residency, etc.)',
    option_arm: 'Ներգաղթի փաստաթուղթ (վիզա, բնակություն և այլն)',
    option_rus: 'Иммиграционный документ (виза, ВНЖ и т.д.)',
    option_ara: 'وثيقة الهجرة (تأشيرة، إقامة، إلخ)',
  },
  {
    option: 'Letter / Email / Correspondence',
    option_arm: 'Նամակ / էլ.փոստ / նամակագրություն',
    option_rus: 'Письмо / Электронное письмо / Переписка',
    option_ara: 'رسالة / بريد إلكتروني / مراسلة',
  },
  {
    option: 'Inheritance / Will Document',
    option_arm: 'Ժառանգության / կտակի փաստաթուղթ',
    option_rus: 'Документ о наследстве / завещании',
    option_ara: 'وثيقة الميراث / الوصية',
  },
  {
    option: 'Lease / Rental Agreement',
    option_arm: 'Վարձակալության պայմանագիր',
    option_rus: 'Договор аренды',
    option_ara: 'عقد الإيجار',
  },
  {
    option: 'Employment Contract',
    option_arm: 'Աշխատանքային պայմանագիր',
    option_rus: 'Трудовой договор',
    option_ara: 'عقد العمل',
  },
  {
    option: 'Insurance Policy',
    option_arm: 'Ապահովագրության պայմանագիր',
    option_rus: 'Страховой полис',
    option_ara: 'وثيقة التأمين',
  },
  {
    option: 'Privacy Policy / Terms of Use',
    option_arm: 'Գաղտնիության քաղաքականություն / Օգտագործման պայմաններ',
    option_rus: 'Политика конфиденциальности / Условия использования',
    option_ara: 'سياسة الخصوصية / شروط الاستخدام',
  },
  {
    option: 'Power of Attorney',
    option_arm: 'Լիազորագիր',
    option_rus: 'Доверенность',
    option_ara: 'تفويض / توكيل',
  },
  {
    option: 'Title Deed / Property Record',
    option_arm: 'Սեփականության վկայական',
    option_rus: 'Право собственности / Документ на недвижимость',
    option_ara: 'سند الملكية / سجل العقار',
  },
  {
    option: 'Affidavit / Sworn Statement',
    option_arm: 'Հայտարարագիր / երդմնյալ հայտարարություն',
    option_rus: 'Аффидевит / Заверенное заявление',
    option_ara: 'إفادة مشفوعة بالقسم',
  },
  {
    option: 'Corporate Policy / Regulation',
    option_arm: 'Կորպորատիվ քաղաքականություն / կանոնակարգ',
    option_rus: 'Корпоративная политика / Регламент',
    option_ara: 'السياسات / اللوائح المؤسسية',
  },
  {
    option: 'Other Legal Document',
    option_arm: 'Այլ իրավաբանական փաստաթուղթ',
    option_rus: 'Другой юридический документ',
    option_ara: 'وثيقة قانونية أخرى',
  },
  {
    option: 'Not Document-Related',
    option_arm: 'Փաստաթղթերից անկախ',
    option_rus: 'Не связано с документом',
    option_ara: 'غير متعلق بوثيقة',
  },
  {
    option: 'Document preparation',
    option_arm: 'Փաստաթղթի պատրաստում',
    option_rus: 'Подготовка документа',
    option_ara: 'تحضير الوثائق',
  },
  {
    option: 'Research / Pre-consultation',
    option_arm: 'Հետազոտություն / Նախնական խորհրդատվություն',
    option_rus: 'Исследование / Предварительная консультация',
    option_ara: 'بحث / استشارة أولية',
  },
  {
    option: 'Not in formal legal process',
    option_arm: 'Ոչ իրավական գործընթացում',
    option_rus: 'Вне формального правового процесса',
    option_ara: 'ليس في إجراء قانوني رسمي',
  },
  {
    option: 'Enforcement or compliance stage',
    option_arm: 'Կատարողական / համապատասխանության փուլ',
    option_rus: 'Этап исполнения или соблюдения',
    option_ara: 'مرحلة التنفيذ أو الامتثال',
  },
  {
    option: 'Appeal / Post-decision',
    option_arm: 'Բողոքարկում / Որոշումից հետո',
    option_rus: 'Апелляция / После решения',
    option_ara: 'الاستئناف / بعد القرار',
  },
  {
    option: 'Awaiting authority decision',
    option_arm: 'Սպասում է պետական որոշման',
    option_rus: 'Ожидание решения органа',
    option_ara: 'في انتظار قرار السلطة',
  },
  {
    option: 'Trial / Hearing preparation',
    option_arm: 'Դատաքննության / լսման պատրաստում',
    option_rus: 'Подготовка к суду / слушанию',
    option_ara: 'التحضير للمحاكمة / الجلسة',
  },
  {
    option: 'Negotiation / Settlement talks',
    option_arm: 'Բանակցություններ / Հաշտեցման խոսակցություններ',
    option_rus: 'Переговоры / Переговоры о соглашении',
    option_ara: 'المفاوضات / محادثات التسوية',
  },
  {
    option: 'Investigation / Discovery',
    option_arm: 'Քննություն / Հայտնաբերում',
    option_rus: 'Расследование / Раскрытие',
    option_ara: 'التحقيق / الاكتشاف',
  },
  {
    option: 'Application / Filing',
    option_arm: 'Դիմում / Ներկայացում',
    option_rus: 'Заявка / Подача',
    option_ara: 'تقديم الطلب',
  },
  {
    option: 'Moderate (€1,000–€10,000)',
    option_arm: 'Միջին (1000–10000 եվրո)',
    option_rus: 'Умеренное (1000–10000 €)',
    option_ara: 'متوسطة (من 1,000 إلى 10,000 يورو)',
  },
  {
    option: 'Minimal (under €1,000 / equivalent)',
    option_arm: 'Նվազագույն (մինչև 1000 եվրո)',
    option_rus: 'Минимальное (до 1000 €)',
    option_ara: 'طفيفة (أقل من 1,000 يورو)',
  },
  {
    option: 'Prefer not to specify',
    option_arm: 'Նախընտրում եմ չնշել',
    option_rus: 'Предпочитаю не указывать',
    option_ara: 'أفضل عدم التحديد',
  },
  {
    option: 'Non-financial matter',
    option_arm: 'Ոչ ֆինանսական հարց',
    option_rus: 'Нефинансовый вопрос',
    option_ara: 'مسألة غير مالية',
  },
  {
    option: 'Major (over €100,000)',
    option_arm: 'Խոշոր (ավելի քան 100,000 եվրո)',
    option_rus: 'Крупное (более 100000 €)',
    option_ara: 'كبيرة (أكثر من 100,000 يورو)',
  },
  {
    option: 'Significant (€10,000–€100,000)',
    option_arm: 'Զգալի (10000–100000 եվրո)',
    option_rus: 'Значительное (10000–100000 €)',
    option_ara: 'هامة (من 10,000 إلى 100,000 يورو)',
  },
  {
    option: 'Responding to legal threat or notice',
    option_arm: 'Իրավական սպառնալիքի կամ ծանուցման արձագանք',
    option_rus: 'Ответ на юридическую угрозу или уведомление',
    option_ara: 'الرد على تهديد قانوني أو إشعار',
  },
  {
    option: 'Preparing a legal document',
    option_arm: 'Իրավական փաստաթուղթի պատրաստում',
    option_rus: 'Подготовка юридического документа',
    option_ara: 'إعداد وثيقة قانونية',
  },
  {
    option: 'Confirming previous advice',
    option_arm: 'Նախորդ խորհրդատվության հաստատում',
    option_rus: 'Подтверждение предыдущего совета',
    option_ara: 'تأكيد النصيحة السابقة',
  },
  {
    option: 'Learning / Educational purposes',
    option_arm: 'Սովորելու / կրթական նպատակներ',
    option_rus: 'Образовательные цели',
    option_ara: 'لأغراض تعليمية',
  },
  {
    option: 'Understanding legal options',
    option_arm: 'Իրավական ընտրանքների ըմբռնում',
    option_rus: 'Понимание юридических вариантов',
    option_ara: 'فهم الخيارات القانونية',
  },
  {
    option: 'Accessing resources or legal aid',
    option_arm: 'Իրավաբանական օգնություն ստանալ',
    option_rus: 'Доступ к ресурсам или юридической помощи',
    option_ara: 'الحصول على الموارد أو المساعدة القانونية',
  },
  {
    option: 'Understanding legal consequences',
    option_arm: 'Իրավական հետևանքների ըմբռնում',
    option_rus: 'Понимание юридических последствий',
    option_ara: 'فهم العواقب القانونية',
  },
  {
    option: 'Evaluating legal risk',
    option_arm: 'Իրավական ռիսկի գնահատում',
    option_rus: 'Оценка юридического риска',
    option_ara: 'تقييم المخاطر القانونية',
  },
  {
    option: 'Planning next steps',
    option_arm: 'Հաջորդ քայլերի պլանավորում',
    option_rus: 'Планирование следующих шагов',
    option_ara: 'تخطيط الخطوات التالية',
  },
  {
    option: 'Seeking legal representation',
    option_arm: 'Իրավաբանական ներկայացուցչության փնտրտուք',
    option_rus: 'Поиск юридического представителя',
    option_ara: 'البحث عن تمثيل قانوني',
  },
  {
    option: 'Assessing enforceability',
    option_arm: 'Իրավաբանական կիրարկելիության գնահատում',
    option_rus: 'Оценка исполнимости',
    option_ara: 'تقييم القابلية للتنفيذ',
  },
  {
    option: 'Initiating legal proceedings',
    option_arm: 'Իրավական գործընթաց սկսելու',
    option_rus: 'Начало судебного разбирательства',
    option_ara: 'بدء الإجراءات القانونية',
  },
  {
    option: 'Business vs Government',
    option_arm: 'Բիզնես ընդդեմ կառավարության',
    option_rus: 'Бизнес против государства',
    option_ara: 'شركة ضد الحكومة',
  },
  {
    option: 'Individual vs Public Authority / Government',
    option_arm: 'Անհատ ընդդեմ պետական մարմնի / կառավարության',
    option_rus: 'Физлицо против госоргана / государства',
    option_ara: 'فرد ضد سلطة عامة / الحكومة',
  },
  {
    option: 'Individual vs Business',
    option_arm: 'Անհատ ընդդեմ բիզնեսի',
    option_rus: 'Физлицо против бизнеса',
    option_ara: 'فرد ضد شركة',
  },
  {
    option: 'Individual vs Individual',
    option_arm: 'Անհատ ընդդեմ անհատի',
    option_rus: 'Физлицо против физлица',
    option_ara: 'فرد ضد فرد',
  },
  {
    option: 'Landlord vs Tenant',
    option_arm: 'Տանտեր ընդդեմ վարձակալ',
    option_rus: 'Арендодатель против арендатора',
    option_ara: 'مالك العقار ضد المستأجر',
  },
  {
    option: 'Family Dispute',
    option_arm: 'Ընտանեկան վեճ',
    option_rus: 'Семейный спор',
    option_ara: 'نزاع عائلي',
  },
  {
    option: 'Buyer vs Seller',
    option_arm: 'Գնորդ ընդդեմ վաճառողի',
    option_rus: 'Покупатель против продавца',
    option_ara: 'المشتري ضد البائع',
  },
  {
    option: 'Creditor vs Debtor',
    option_arm: 'Վարկատու ընդդեմ պարտատիրոջ',
    option_rus: 'Кредитор против должника',
    option_ara: 'الدائن ضد المدين',
  },
  {
    option: 'NGO vs Government (e.g., for advocacy-related queries)',
    option_arm: 'ՀԿ ընդդեմ կառավարության (օր.՝ շահերի պաշտպանություն)',
    option_rus: 'НПО против государства (напр., защита интересов)',
    option_ara: 'منظمة غير حكومية ضد الحكومة (مثل قضايا المناصرة)',
  },
  {
    option: 'Employer vs Employee',
    option_arm: 'Գործատու ընդդեմ աշխատողի',
    option_rus: 'Работодатель против работника',
    option_ara: 'صاحب العمل ضد الموظف',
  },
  {
    option: 'Business vs Business',
    option_arm: 'Բիզնես ընդդեմ բիզնեսի',
    option_rus: 'Бизнес против бизнеса',
    option_ara: 'شركة ضد شركة',
  },
  {
    option: 'Ongoing issue',
    option_arm: 'Ընթացիկ խնդիր',
    option_rus: 'Текущая проблема',
    option_ara: 'قضية مستمرة',
  },
  {
    option: 'Long-term (future planning)',
    option_arm: 'Երկարաժամկետ (ապագայի պլանավորում)',
    option_rus: 'Долгосрочная (планирование на будущее)',
    option_ara: 'طويل الأجل (تخطيط مستقبلي)',
  },
  {
    option: 'Medium-term (1–6 months)',
    option_arm: 'Միջինաժամկետ (1-6 ամիս)',
    option_rus: 'Среднесрочная (1–6 месяцев)',
    option_ara: 'متوسط الأجل (1-6 أشهر)',
  },
  {
    option: 'Short-term (within 30 days)',
    option_arm: 'Կարճաժամկետ (մինչև 30 օր)',
    option_rus: 'Краткосрочная (в пределах 30 дней)',
    option_ara: 'قصير الأجل (في غضون 30 يومًا)',
  },
  {
    option: 'Immediate (less than 7 days)',
    option_arm: 'Անհապաղ (մինչև 7 օր)',
    option_rus: 'Немедленная (менее 7 дней)',
    option_ara: 'فورية (أقل من 7 أيام)',
  },
  {
    option: 'Past issue (already occurred)',
    option_arm: 'Անցյալ խնդիր (արդեն տեղի է ունեցել)',
    option_rus: 'Проблема в прошлом (уже произошла)',
    option_ara: 'مشكلة سابقة (حدثت بالفعل)',
  },
];

export async function seedQuestionOptionsTranslations() {
  console.log('👉 Patching option translations (ARM / RUS / AR)...');
  await AppDataSource.initialize();
  const optionRepo = AppDataSource.getRepository(QuestionOption);

  for (const { option, option_arm, option_rus, option_ara } of translations) {
    const existingOptions = await optionRepo.find({ where: { option } });

    if (existingOptions.length === 0) {
      console.warn(`⚠️ Option not found in DB: ${option}`);
      continue;
    }

    let updatedCount = 0;

    for (const existing of existingOptions) {
      let updated = false;

      if (!existing.option_arm || existing.option_arm.trim() === '') {
        existing.option_arm = option_arm;
        updated = true;
      }

      if (!existing.option_rus || existing.option_rus.trim() === '') {
        existing.option_rus = option_rus;
        updated = true;
      }

      if (!existing.option_ara || existing.option_ara.trim() === '') {
        existing.option_ara = option_ara;
        updated = true;
      }

      if (updated) {
        await optionRepo.save(existing);
        updatedCount++;
      }
    }

    if (updatedCount > 0) {
      console.log(`✅ Updated ${updatedCount} rows for: ${option}`);
    } else {
      console.log(`⏩ Skipped (already translated): ${option}`);
    }
  }

  console.log('✅ Option translations patch complete.');
}
