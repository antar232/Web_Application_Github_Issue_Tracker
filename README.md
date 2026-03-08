#  What is the difference between var, let, and const?
১. Scope (সুযোগ বা সীমা)
var: একটি ফাংশনের ভেতর var দিয়ে কিছু লিখলে তা পুরো ফাংশনে পাওয়া যায়। কিন্তু ব্লকের (যেমন if বা for লুপ) বাইরেও এটি অ্যাক্সেস করা যেতে পারে।

let & const: এই দুটি Block-scoped। অর্থাৎ, এরা শুধুমাত্র নির্দিষ্ট কোঁকড়া বন্ধনী { } বা ব্লকের ভেতরেই কাজ করে। ব্লকের বাইরে এদের পাওয়া যায় না।

২. Re-declaration এবং Update
var: একই নামে বারবার ভেরিয়েবল ডিক্লেয়ার করা যায় এবং মান পরিবর্তন করা যায়।

let: একই স্কোপে একই নামে দ্বিতীয়বার ডিক্লেয়ার করা যায় না, তবে মান পরিবর্তন করা সম্ভব।

const: এটি ধ্রুবক। এটি একবার ডিক্লেয়ার করলে পুনরায় ডিক্লেয়ার বা মান পরিবর্তন—কোনোটাই করা যায় না।

৩. Hoisting
var: এটি হোইস্টিং সাপোর্ট করে এবং ডিফল্টভাবে undefined ভ্যালু নিয়ে থাকে।

let & const: এদের ক্ষেত্রেও হোইস্টিং হয়, কিন্তু এরা "Temporal Dead Zone"-এ থাকে। তাই ডিক্লেয়ার করার আগে এদের ব্যবহার করতে গেলে এরর দেখাবে।

 # What is the spread operator (...)?
 # What is the difference between map(), filter(), and forEach()?
 # What is an arrow function?
 # What are template literals?