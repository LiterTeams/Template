import { BreadcrumbIF } from "@entities/interfaces/breadcrumb.interfaces";

const breadcrumbGenerate = (pathname: string) => {
    const breadcrumbs: BreadcrumbIF[] = [];
    const breadcrumbsArray = pathname.split("/");
    breadcrumbsArray.shift();
    breadcrumbsArray.forEach((breadcrumbItem, index) => {
        const breadcrumb = {
            label: breadcrumbItem,
            href: `/${breadcrumbsArray.slice(0, index + 1).join("/")}`,
            active: breadcrumbsArray.length - 1 == index,
        }
        breadcrumbs.push(breadcrumb);
    });
    return breadcrumbs;
}

export default breadcrumbGenerate;