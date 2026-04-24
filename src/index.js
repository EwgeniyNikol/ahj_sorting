import './css/style.css';

const SORT_INTERVAL_MS = 2000;

const sortOrders = [
  { field: 'id', dir: 'asc' },
  { field: 'id', dir: 'desc' },
  { field: 'title', dir: 'asc' },
  { field: 'title', dir: 'desc' },
  { field: 'year', dir: 'asc' },
  { field: 'year', dir: 'desc' },
  { field: 'imdb', dir: 'asc' },
  { field: 'imdb', dir: 'desc' },
];

function loadData() {
  return new Promise((resolve) => {
    const films = [
      {
        id: 26, title: 'Побег из Шоушенка', imdb: 9.30, year: 1994,
      },
      {
        id: 25, title: 'Крёстный отец', imdb: 9.20, year: 1972,
      },
      {
        id: 27, title: 'Крёстный отец 2', imdb: 9.00, year: 1974,
      },
      {
        id: 1047, title: 'Тёмный рыцарь', imdb: 9.00, year: 2008,
      },
      {
        id: 223, title: 'Криминальное чтиво', imdb: 8.90, year: 1994,
      },
    ];
    resolve(films);
  });
}

function renderTable(films) {
  const tbody = document.querySelector('.films-table tbody');
  tbody.innerHTML = '';
  films.forEach((film) => {
    const tr = document.createElement('tr');
    tr.dataset.id = film.id;
    tr.dataset.title = film.title;
    tr.dataset.year = film.year;
    tr.dataset.imdb = film.imdb.toFixed(2);

    tr.innerHTML = `
      <td>#${film.id}</td>
      <td>${film.title}</td>
      <td>(${film.year})</td>
      <td>imdb: ${film.imdb.toFixed(2)}</td>
    `;
    tbody.append(tr);
  });
}

function updateHeaderIndicator(field, dir) {
  const headers = document.querySelectorAll('.films-table th');
  headers.forEach((th) => {
    th.classList.remove('sorted-asc', 'sorted-desc');
    if (th.dataset.sort === field) {
      th.classList.add(dir === 'asc' ? 'sorted-asc' : 'sorted-desc');
    }
  });

  const indicator = document.querySelector('.sort-indicator');
  const fieldNames = {
    id: 'id', title: 'Название', year: 'Год', imdb: 'IMDb',
  };
  const dirNames = { asc: '▲ по возрастанию', desc: '▼ по убыванию' };
  indicator.textContent = `Сортировка: ${fieldNames[field]} ${dirNames[dir]}`;
}

function sortTable(field, dir) {
  const tbody = document.querySelector('.films-table tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  const sortedRows = rows.sort((a, b) => {
    let aVal = a.dataset[field];
    let bVal = b.dataset[field];

    if (field === 'id' || field === 'year') {
      aVal = parseInt(aVal, 10);
      bVal = parseInt(bVal, 10);
    } else if (field === 'imdb') {
      aVal = parseFloat(aVal);
      bVal = parseFloat(bVal);
    }

    let comparison = 0;
    if (aVal > bVal) {
      comparison = 1;
    } else if (aVal < bVal) {
      comparison = -1;
    }

    return dir === 'asc' ? comparison : -comparison;
  });

  for (let i = 0; i < sortedRows.length; i += 1) {
    if (tbody.children[i] !== sortedRows[i]) {
      tbody.insertBefore(sortedRows[i], tbody.children[i]);
    }
  }

  updateHeaderIndicator(field, dir);
}

let currentSortIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.querySelector('.films-table tbody');
  if (!tbody) {
    throw new Error('Элемент .films-table tbody не найден в DOM');
  }

  const indicator = document.querySelector('.sort-indicator');
  if (!indicator) {
    throw new Error('Элемент .sort-indicator не найден в DOM');
  }

  loadData().then((films) => {
    renderTable(films);
    sortTable(sortOrders[0].field, sortOrders[0].dir);
    currentSortIndex = 1;

    setInterval(() => {
      const { field, dir } = sortOrders[currentSortIndex];
      sortTable(field, dir);
      currentSortIndex = (currentSortIndex + 1) % sortOrders.length;
    }, SORT_INTERVAL_MS);
  });
});
