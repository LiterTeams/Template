# NextJS & NestJS Template | NexstJS Template
Шаблон клиентского и серверного приложения
В Backend части присутствуют папки (System). Их желательно не трогать, так как они уже настроенны необходимым образом, чтобы не лезть в код, но взаимодейтсовать с ними или внести некоторые корректировки, по типу защитников и т.п за милую душу.

## NextJS 15 - Clirnt

### i18n
Если вы не хотите иметь локальзацию в проекте, то просто сделайте следующее:
1. удалите папку localization;
2. удалите папку i18n в src;
3. очистите middleware.ts или просто удалите его;
4. удалите LocalePropsT из src/shared/types/enum.types.ts;
5. удалите папку [locale] в src/app;
6. удалить всё, что относится к next-intl/plugin в next.config.ts;
7. Удалить саму библиотеку локализации - next-intl;
8. в rootLayout (src/app/layout.tsx) удалите:
    1. NextIntlClientProvider;
    2. getMessages;
    3. notFound;
    4. routing;
    5. LocalePropsT;
    6. всё остальное, что будет подсвечиваться красным.
По итогу, у вас должно быть так:
![result](/client/files/jhdGWpkOC_o.jpg)