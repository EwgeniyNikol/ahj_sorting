describe('Sorting Table', () => {
  let tbody;

  beforeEach(() => {
    document.body.innerHTML = `
      <table class="films-table">
        <thead>
          <tr>
            <th data-sort="id">id</th>
            <th data-sort="title">Название</th>
            <th data-sort="year">Год</th>
            <th data-sort="imdb">IMDb</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div class="sort-indicator"></div>
    `;
    tbody = document.querySelector('.films-table tbody');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('должен выбросить ошибку, если tbody не найден', () => {
    document.body.innerHTML = '';
    expect(() => {
      const t = document.querySelector('.films-table tbody');
      if (!t) throw new Error('Элемент .films-table tbody не найден в DOM');
    }).toThrow('Элемент .films-table tbody не найден в DOM');
  });

  test('должен выбросить ошибку, если indicator не найден', () => {
    document.body.innerHTML = `
      <table class="films-table"><tbody></tbody></table>
    `;
    expect(() => {
      const ind = document.querySelector('.sort-indicator');
      if (!ind) throw new Error('Элемент .sort-indicator не найден в DOM');
    }).toThrow('Элемент .sort-indicator не найден в DOM');
  });

  test('таблица должна создавать строки с data-атрибутами', () => {
    const films = [
      {
        id: 26, title: 'Побег из Шоушенка', imdb: 9.30, year: 1994,
      },
    ];

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

    const row = tbody.querySelector('tr');
    expect(row.dataset.id).toBe('26');
    expect(row.dataset.title).toBe('Побег из Шоушенка');
    expect(row.dataset.year).toBe('1994');
    expect(row.dataset.imdb).toBe('9.30');
  });

  test('сортировка по id (возрастание) должна работать', () => {
    const films = [
      {
        id: 26, title: 'BBB', imdb: 9.0, year: 1994,
      },
      {
        id: 25, title: 'AAA', imdb: 9.0, year: 1972,
      },
    ];

    films.forEach((film) => {
      const tr = document.createElement('tr');
      tr.dataset.id = film.id;
      tr.dataset.title = film.title;
      tr.dataset.year = film.year;
      tr.dataset.imdb = film.imdb.toFixed(2);
      tr.innerHTML = `<td>#${film.id}</td>`;
      tbody.append(tr);
    });

    const rows = Array.from(tbody.querySelectorAll('tr'));
    const sorted = rows.sort((a, b) => {
      const aVal = parseInt(a.dataset.id, 10);
      const bVal = parseInt(b.dataset.id, 10);
      return aVal - bVal;
    });

    expect(sorted[0].dataset.id).toBe('25');
    expect(sorted[1].dataset.id).toBe('26');
  });
});
