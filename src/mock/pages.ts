import {
  Page,
  Pages,
  PageResponse,
  PagesResponse,
  PageRevision,
  PageRevisions,
  PageRevisionResponse,
  PageRevisionsResponse,
} from '../app/app.types';

const mockPageOne: Page = {
  id: '9c85a53e-7ecf-4f6c-bed5-bc006b8c7fa4',
  created_by_id: '9baa6092-a30f-461a-a5fc-5132b3264b91',
  modified_by_id: null,
  owned_by_id: null,
  parent_id: null,
  page_type: 'article',
  created_at: '2024-07-14T17:29:29.000000Z',
  updated_at: '2024-07-14T17:29:29.000000Z',
  deleted_at: null,
  start_at: null,
  planned_start_at: null,
  end_at: null,
  planned_end_at: null,
  canceled_at: null,
  closed_at: null,
  embargo_at: null,
  fixed_at: null,
  postponed_at: null,
  published_at: null,
  released_at: null,
  resumed_at: null,
  resolved_at: null,
  suspended_at: null,
  gids: 0,
  po: 0,
  pg: 0,
  pw: 0,
  only_admin: false,
  only_user: false,
  only_guest: false,
  allow_public: true,
  status: 0,
  rank: 0,
  revision: 0,
  size: 0,
  matrix: '',
  x: null,
  y: null,
  z: null,
  r: null,
  theta: null,
  rho: null,
  phi: null,
  elevation: null,
  latitude: null,
  longitude: null,
  active: true,
  canceled: false,
  closed: false,
  completed: false,
  duplicate: false,
  fixed: false,
  flagged: false,
  internal: false,
  is_external: false,
  is_redirect: false,
  locked: false,
  pending: false,
  planned: false,
  problem: false,
  published: true,
  released: false,
  retired: false,
  resolved: false,
  sitemap: false,
  suspended: false,
  unknown: false,
  redirect_delay: 0,
  status_code: 0,
  label: '',
  title: 'Test Page',
  byline: '',
  slug: 'test-page',
  url: '',
  description: '',
  introduction: '',
  content: '<p>Content for the test page.</p>',
  summary: '',
  route: 'string',
  locale: '',
  icon: '',
  image: '',
  avatar: '',
  ui: [],
  assets: [],
  meta: [],
  notes: [],
  params: {},
  options: [],
  sources: [],
};

const mockPagesOne: Pages = [mockPageOne];

const mockPageOneResponse: PageResponse = {
  data: mockPageOne,
  meta: {
    id: '9c85a53e-7ecf-4f6c-bed5-bc006b8c7fa4',
    rules: [],
    session_user_id: '9baa6092-a30f-461a-a5fc-5132b3264b91',
    timestamp: '2024-07-14T17:37:13.520331Z',
    validated: [],
    info: {
      model_attribute: 'title',
      model_label: 'Page',
      model_label_plural: 'Pages',
      model_route: 'playground.cms.api.pages',
      model_slug: 'page',
      model_slug_plural: 'pages',
      module_label: 'CMS',
      module_label_plural: 'CMS',
      module_route: 'playground.cms.api',
      module_slug: 'cms',
      privilege: 'playground-cms-api:page',
      table: 'cms_pages',
    },
  },
};

const mockPagesOneResponse: PagesResponse = {
  data: [mockPageOne],
  links: {
    first: 'http://site-playground-integration/api/cms/pages?perPage=15&page=1',
    last: 'http://site-playground-integration/api/cms/pages?perPage=15&page=1',
    prev: null,
    next: null,
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    links: [
      {
        url: null,
        label: '&laquo; Previous',
        active: false,
      },
      {
        url: 'http://site-playground-integration/api/cms/pages?perPage=15&page=1',
        label: '1',
        active: true,
      },
      {
        url: null,
        label: 'Next &raquo;',
        active: false,
      },
    ],
    columns: [],
    dates: [],
    flags: [],
    ids: [],
    rules: [],
    sortable: [],
    session_user_id: '9baa6092-a30f-461a-a5fc-5132b3264b91',
    timestamp: '2024-07-14T17:37:13.520331Z',
    validated: [],
    path: 'http://site-playground-integration/api/cms/pages',
    per_page: 15,
    to: 1,
    total: 1,
    info: {
      model_attribute: 'title',
      model_label: 'Page',
      model_label_plural: 'Pages',
      model_route: 'playground.cms.api.pages',
      model_slug: 'page',
      model_slug_plural: 'pages',
      module_label: 'CMS',
      module_label_plural: 'CMS',
      module_route: 'playground.cms.api',
      module_slug: 'cms',
      privilege: 'playground-cms-api:page',
      table: 'cms_pages',
    },
  },
};

const mockPageRevisionOne: PageRevision = {
  id: '9c95eba1-76cb-4289-8486-456c651a0b77',
  created_by_id: '9baa6092-a30f-461a-a5fc-5132b3264b91',
  modified_by_id: null,
  owned_by_id: null,
  parent_id: null,
  page_id: '9c85a53e-7ecf-4f6c-bed5-bc006b8c7fa4',
  page_type: 'article',
  created_at: '2024-07-14T17:29:29.000000Z',
  updated_at: '2024-07-14T17:29:29.000000Z',
  deleted_at: null,
  start_at: null,
  planned_start_at: null,
  end_at: null,
  planned_end_at: null,
  canceled_at: null,
  closed_at: null,
  embargo_at: null,
  fixed_at: null,
  postponed_at: null,
  published_at: null,
  released_at: null,
  resumed_at: null,
  resolved_at: null,
  suspended_at: null,
  gids: 0,
  po: 0,
  pg: 0,
  pw: 0,
  only_admin: false,
  only_user: false,
  only_guest: false,
  allow_public: true,
  status: 0,
  rank: 0,
  revision: 0,
  size: 0,
  matrix: '',
  x: null,
  y: null,
  z: null,
  r: null,
  theta: null,
  rho: null,
  phi: null,
  elevation: null,
  latitude: null,
  longitude: null,
  active: true,
  canceled: false,
  closed: false,
  completed: false,
  duplicate: false,
  fixed: false,
  flagged: false,
  internal: false,
  is_external: false,
  is_redirect: false,
  locked: false,
  pending: false,
  planned: false,
  problem: false,
  published: true,
  released: false,
  retired: false,
  resolved: false,
  sitemap: false,
  suspended: false,
  unknown: false,
  redirect_delay: 0,
  status_code: 0,
  label: '',
  title: 'Test Page',
  byline: '',
  slug: 'test-page',
  url: '',
  description: '',
  introduction: '',
  content: '<p>Content for the test page.</p>',
  summary: '',
  route: 'string',
  locale: '',
  icon: '',
  image: '',
  avatar: '',
  ui: [],
  assets: [],
  meta: [],
  notes: [],
  params: {},
  options: [],
  sources: [],
};

const mockPageRevisionsOne: PageRevisions = [mockPageRevisionOne];

const mockPageRevisionOneResponse: PageRevisionResponse = {
  data: mockPageRevisionOne,
  meta: {
    id: '9c85a53e-7ecf-4f6c-bed5-bc006b8c7fa4',
    rules: [],
    session_user_id: '9baa6092-a30f-461a-a5fc-5132b3264b91',
    timestamp: '2024-07-14T17:37:13.520331Z',
    validated: [],
    info: {
      model_attribute: 'title',
      model_label: 'Page Revision',
      model_label_plural: 'Page Revisions',
      model_route: 'playground.cms.api.pages.revisions',
      model_slug: 'page',
      model_slug_plural: 'pages',
      module_label: 'CMS',
      module_label_plural: 'CMS',
      module_route: 'playground.cms.api',
      module_slug: 'cms',
      privilege: 'playground-cms-api:page',
      table: 'cms_pages',
    },
  },
};

const mockPageRevisionsOneResponse: PageRevisionsResponse = {
  data: [mockPageRevisionOne],
  links: {
    first:
      'http://site-playground-integration/api/cms/pages/9c85a53e-7ecf-4f6c-bed5-bc006b8c7fa4/revisions?perPage=15&page=1',
    last: 'http://site-playground-integration/api/cms/pages/9c85a53e-7ecf-4f6c-bed5-bc006b8c7fa4/revisions?perPage=15&page=1',
    prev: null,
    next: null,
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    links: [
      {
        url: null,
        label: '&laquo; Previous',
        active: false,
      },
      {
        url: 'http://site-playground-integration/api/cms/pages/9c85a53e-7ecf-4f6c-bed5-bc006b8c7fa4/revisions?perPage=15&page=1',
        label: '1',
        active: true,
      },
      {
        url: null,
        label: 'Next &raquo;',
        active: false,
      },
    ],
    columns: [],
    dates: [],
    flags: [],
    ids: [],
    rules: [],
    sortable: [],
    session_user_id: '9baa6092-a30f-461a-a5fc-5132b3264b91',
    timestamp: '2024-07-14T17:37:13.520331Z',
    validated: [],
    path: 'http://site-playground-integration/api/cms/pages/9c85a53e-7ecf-4f6c-bed5-bc006b8c7fa4/revisions',
    per_page: 15,
    to: 1,
    total: 1,
    info: {
      model_attribute: 'title',
      model_label: 'Page Revision',
      model_label_plural: 'Page Revisions',
      model_route: 'playground.cms.api.pages.revisions',
      model_slug: 'page',
      model_slug_plural: 'pages',
      module_label: 'CMS',
      module_label_plural: 'CMS',
      module_route: 'playground.cms.api',
      module_slug: 'cms',
      privilege: 'playground-cms-api:page',
      table: 'cms_pages',
    },
  },
};

export {
  mockPageOne,
  mockPagesOne,
  mockPageOneResponse,
  mockPagesOneResponse,
  mockPageRevisionOne,
  mockPageRevisionsOne,
  mockPageRevisionOneResponse,
  mockPageRevisionsOneResponse,
};
