const PrivacyPolicy = () => {
    return (
      <div className="flex flex-col items-center text-right p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">מדיניות פרטיות</h1>
        
        <h2 className="text-2xl font-semibold mt-4">1. איסוף מידע</h2>
        <p className="text-lg mt-2">1.1. אנו אוספים מידע אישי שמסרת לנו בעת ההרשמה או השימוש באתר, כגון שם, כתובת אימייל, ותוכן אחר שנמסר מרצונך.</p>
        
        <h2 className="text-2xl font-semibold mt-4">2. שימוש במידע</h2>
        <p className="text-lg mt-2">2.1. המידע ישמש למטרות הבאות:</p>
        <ul className="list-disc pr-6 text-lg">
          <li>לספק את השירותים המוצעים באתר.</li>
          <li>לשפר את חווית המשתמש.</li>
          <li>לשלוח עדכונים או הצעות מיוחדות, בכפוף להסכמתך.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-4">3. שיתוף מידע</h2>
        <p className="text-lg mt-2">3.1. אנו לא משתפים את המידע האישי שלך עם צדדים שלישיים, למעט במקרים הבאים:</p>
        <ul className="list-disc pr-6 text-lg">
          <li>כדי לעמוד בדרישות חוק.</li>
          <li>לצורך אספקת השירותים על ידי צדדים שלישיים הפועלים מטעמנו.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-4">4. אבטחת מידע</h2>
        <p className="text-lg mt-2">4.1. אנו נוקטים באמצעי אבטחה סבירים על מנת להגן על המידע האישי שלך מפני גישה בלתי מורשית.</p>
      </div>
    );
  };
  
  export default PrivacyPolicy;  