import { Slash } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import React from 'react';

type BreadcrumbItemType = {
  label: string;
  href: string;
};

type BreadCrumbProps = {
  items: BreadcrumbItemType[];
};

const BreadCrumb = ({ items }: BreadCrumbProps) => {
  if (!items || items.length === 0) return null;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={item.href + index.toString()}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator>
                <Slash className="w-3 h-3" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default BreadCrumb;
