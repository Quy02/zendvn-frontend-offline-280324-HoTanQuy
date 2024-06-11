let CATEGORIES = [
  {
    id: self.crypto.randomUUID(),
    name: 'Thế giới',
    status: true,
    ordering: 1,
  },
  {
    id: self.crypto.randomUUID(),
    name: 'Thời sự',
    status: false,
    ordering: 2,
  },
  {
    id: self.crypto.randomUUID(),
    name: 'Kinh doanh',
    status: true,
    ordering: 3,
  },
  {
    id: self.crypto.randomUUID(),
    name: 'Giải trí',
    status: true,
    ordering: 4,
  },
  {
    id: self.crypto.randomUUID(),
    name: 'Thể thao',
    status: true,
    ordering: 5,
  },
  {
    id: self.crypto.randomUUID(),
    name: 'Pháp luật',
    status: true,
    ordering: 6,
  },
  {
    id: self.crypto.randomUUID(),
    name: 'Sức khỏe',
    status: true,
    ordering: 7,
  },
  {
    id: self.crypto.randomUUID(),
    name: 'Giáo dục',
    status: true,
    ordering: 8,
  },
  {
    id: self.crypto.randomUUID(),
    name: 'Du lịch',
    status: true,
    ordering: 9,
  },
  {
    id: self.crypto.randomUUID(),
    name: 'Số hóa',
    status: true,
    ordering: 10,
  },
];

localStorage.setItem("CATEGORIES", JSON.stringify(CATEGORIES));
