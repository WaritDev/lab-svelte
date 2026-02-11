import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
    // 1. Mock Data (ย้ายมาไว้ที่นี่)
    // (ในของจริง ตรงนี้อาจจะเป็นการ fetch('https://api.example.com/employees'))
    const allEmployees = [
        { id: 1, name: 'Somchai Jaidee', role: 'Engineer', dept: 'Engineering' },
        { id: 2, name: 'Somsri Rakngan', role: 'Designer', dept: 'Marketing' },
        { id: 3, name: 'John Doe', role: 'Manager', dept: 'Management' },
        { id: 4, name: 'Jane Smith', role: 'Engineer', dept: 'Engineering' },
        { id: 5, name: 'Tony Stark', role: 'CEO', dept: 'Management' },
        { id: 6, name: 'Peter Parker', role: 'Intern', dept: 'Engineering' },
    ];

    // 2. ดึงค่าจาก URL Params
    const q = url.searchParams.get('q') || '';
    const dept = url.searchParams.get('dept') || 'All';

    // 3. Filter Data (Business Logic อยู่ที่นี่)
    const filteredEmployees = allEmployees.filter(emp => {
        const matchName = emp.name.toLowerCase().includes(q.toLowerCase());
        const matchDept = dept === 'All' || emp.dept === dept;
        return matchName && matchDept;
    });

    // 4. ส่งข้อมูลที่ "พร้อมใช้" ไปให้หน้าเว็บ
    return {
        employees: filteredEmployees, // ส่งเฉพาะคนที่ผ่านเกณฑ์ไป
        filters: { q, dept }          // ส่งค่า filter กลับไป (เพื่อเอาไปแปะใน Input Box)
    };
};