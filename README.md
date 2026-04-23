# Таблица с сортировкой по data-атрибутам
[![Build Status](https://github.com/EwgeniyNikol/ahj_sorting/actions/workflows/deploy.yml/badge.svg)](https://github.com/EwgeniyNikol/ahj_sorting/actions)

[Посмотреть](https://EwgeniyNikol.github.io/ahj_sorting/)

## Описание

Таблица фильмов с циклической сортировкой по data-атрибутам.  
Каждые 2 секунды меняется поле и направление сортировки (id, название, год, imdb).  
Данные хранятся в `dataset` строк таблицы, сортировка через diff-перемещение DOM-узлов.

## Запуск

```bash
npm install
npm start