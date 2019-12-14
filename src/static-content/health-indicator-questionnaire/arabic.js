export const healthIndicatorQuestionnaire = {
  digitalHeathQuestionnaire: 'استبيان الصحة الرقمية',
  pdfTitle: '{country} - استبيان الصحة الرقمية',
  note: 'ملاحظة: سيكون عرض بيانات مؤشر الصحة الرقمية العالمية متاحا للعموم. وعلى هذا النحو، يرجى الحصول على موافقة لتقديمها من الوكالة الحكومية ذات الصلة (وزارة الصحة، وكالة الصحة الرقمية، إلخ) وتقديم معلومات الاتصال الخاصة بالجهة التي منحت الموافقة. سيؤدي ترك هذه الصفحة إلى تجاهل التغييرات غير المحفوظة.',
  contactForm: {
    contactInformation: 'معلومات الاتصال',
    dateOnWhichDataWasCollected: 'تاريخ جمع البيانات (DD-MM-YYYY)',
    dateFormat: 'DD-MM-YYYY',
    nameOfPersonEnteringData: 'اسم الشخص الذي يدخل البيانات',
    roleOfThePersonEnteringData: 'دور الشخص الذي يدخل البيانات',
    emailOfThePersonEnteringData: 'البريد الإلكتروني للشخص الذي يدخل البيانات',
    nameOfTheApprover: 'اسم الجهة المعتمدة للموافقة',
    roleOfTheApprover: 'دور الجهة المعتمدة للموافقة',
    emailOfTheApprover: 'البريد الإلكتروني للجهة المعتمدة للموافقة',
    nameOfTheCountryContact: 'اسم جهة الاتصال بالبلد',
    roleOfTheCountryContact: 'دور جهة الاتصال بالدولة',
    emailOfTheCountryContact: 'البريد الإلكتروني لجهة الاتصال بالبلد',
    countrySummary: 'ملخص البلد',
    organisationOfTheCountryContact: 'المنظمة التي يتبع لها جهة الاتصال بالبلد',
    error: {//client-verification-pending
      wrongDate: 'الرجاء إدخال تاريخ بين عام 2010 والتاريخ الحالي',
      nameOfPersonEnteringData: 'اسم الشخص الذي يدخل البيانات مطلوب',
      roleOfThePersonEnteringData: 'مطلوب دور الشخص الذي يدخل البيانات',
      email: 'يرجى إدخال البريد الإلكتروني الصحيح',
      nameOfTheApprover: 'اسم الشخص الذي يوافق على البيانات مطلوب',
      roleOfTheApprover: 'دور الشخص الذي يوافق على البيانات مطلوب',
      nameOfTheCountryContact: 'الاتصال البلد هو مطلوب',
      roleOfTheCountryContact: 'دور الاتصال البلد هو مطلوب',
      countrySummary: 'ملخص البلد مطلوب',
      organisationOfTheCountryContact: 'يرجى إدخال المنظمة',
    },
    hoverText: {//client-verification-pending
      date: 'الرجاء إدخال تاريخ',
      nameOfPersonEnteringData: 'الرجاء إدخال اسم الشخص الذي يدخل هذه البيانات',
      roleOfThePersonEnteringData: 'يرجى إدخال دور الشخص الذي يدخل البيانات',
      email: 'أدخل البريد الإلكتروني',
      nameOfTheApprover: 'الرجاء إدخال اسم الشخص الذي يوافق على البيانات',
      roleOfTheApprover: 'يرجى إدخال دور الشخص الذي يوافق على البيانات',
      nameOfTheCountryContact: 'الاتصال البلد',
      roleOfTheCountryContact: 'دور الاتصال البلد',
      organisationOfTheCountryContact: 'أدخل منظمة الاتصال البلد',
    }
  },
  resourceForm: {
    resourceInformation: 'معلومات الموارد',
    note: 'يرجى تقديم روابط إلى الموارد ذات الصلة بالصحة الرقمية لبلدك.',
    exampleFormat: 'مثال التنسيق: www.example.com',
    resource: 'المصدر {number}',
    errorMessage: 'الرجاء إدخال رابط ويب صالح للمورد' //client-verification-pending
  },
  notifications: {//client-verification-pending
    submit: 'نموذج مقدم للمراجعة',
    saveCorrection: 'تم حفظ النموذج بنجاح!',
    save: 'تم حفظ النموذج بنجاح!',
    publish: 'البيانات هي الآن على الهواء مباشرة',
    download: 'بدأ التنزيل بنجاح',
    correctTheHighlightedFields: 'اذا سمحت صحح الخانات المحدده.',
    somethingWentWrong: 'لقد حدث خطأ ما. يرجى تحديث الصفحة!'
  },
  indicatorDetails: 'تفاصيل المؤشر',
  indicatorScoreError: 'مؤشر النتيجة والحقل المنطقي مطلوب.', //client-verification-pending
  rationaleOrSupportingText: 'الأساس المنطقي أو النص الداعم',
  downloadPDF: 'تحميل PDF', //client-verification-pending
  saveAsDraft: 'حفظ كمسودة', //client-verification-pending
  submit: 'خضع', //client-verification-pending
  save: 'حفظ', //client-verification-pending
  reject: 'الرجاء إدخال رابط ويب صالح للمورد...', //client-verification-pending
  publish: 'نشر', //client-verification-pending
  note1: 'سيتم عرض هذه التفاصيل علانية على منصة GDHI.', //client-verification-pending
  note2: 'لن يتم عرض هذه التفاصيل على منصة GDHI وهي لأغراضنا الإعلامية.', //client-verification-pending
  note3: 'سيتم عرض نقاط كل مؤشر علنًا فقط على منصة GDHI.', //client-verification-pending
  publishConfirmation: 'أنت على وشك نشر نموذج فهرس الصحة الرقمية لـ {country}. هذا لا يمكن التراجع عنه. هل تريد الاستمرار؟', //client-verification-pending
  rejectConfirmation: 'أنت على وشك رفض نموذج مؤشر الصحة لـ {country}. هذا لا يمكن التراجع عنه. هل تريد الاستمرار؟', //client-verification-pending
};
