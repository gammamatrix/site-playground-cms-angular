import {
  Snippet,
  Snippets,
  SnippetResponse,
  SnippetsResponse,
  SnippetRevision,
  SnippetRevisions,
  SnippetRevisionResponse,
  SnippetRevisionsResponse,
} from '../app/app.types';

const mockSnippetOne: Snippet = {
  id: '9c85a579-87a7-4b1e-bc4d-a6746179e009',
  created_by_id: '9baa6092-a30f-461a-a5fc-5132b3264b91',
  modified_by_id: null,
  owned_by_id: null,
  parent_id: null,
  snippet_type: 'banner',
  created_at: '2024-07-14T17:30:07.000000Z',
  updated_at: '2024-07-14T17:30:07.000000Z',
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
  label: '',
  title: 'Test Snippet',
  byline: '',
  slug: 'test-snippet',
  url: '',
  description: '',
  introduction: '',
  content: '<p>Test Snippet Content</p>',
  summary: '',
  locale: '',
  icon: '',
  image: '',
  avatar: '',
  ui: [],
  assets: [],
  meta: [],
  notes: [],
  options: [],
  sources: [],
};

const mockSnippetsOne: Snippets = [mockSnippetOne];

const mockSnippetOneResponse: SnippetResponse = {
  data: mockSnippetOne,
  meta: {
    id: '9c85a579-87a7-4b1e-bc4d-a6746179e009',
    rules: [],
    session_user_id: '9baa6092-a30f-461a-a5fc-5132b3264b91',
    timestamp: '2024-07-14T17:37:13.520331Z',
    validated: [],
    info: {
      model_attribute: 'title',
      model_label: 'Snippet',
      model_label_plural: 'Snippets',
      model_route: 'playground.cms.api.snippets',
      model_slug: 'snippet',
      model_slug_plural: 'snippets',
      module_label: 'CMS',
      module_label_plural: 'CMS',
      module_route: 'playground.cms.api',
      module_slug: 'cms',
      privilege: 'playground-cms-api:snippet',
      table: 'cms_snippets',
    },
  },
};

const mockSnippetsOneResponse: SnippetsResponse = {
  data: [mockSnippetOne],
  links: {
    first:
      'http://site-playground-integration/api/cms/snippets?perPage=15&page=1',
    last: 'http://site-playground-integration/api/cms/snippets?perPage=15&page=1',
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
        url: 'http://site-playground-integration/api/cms/snippets?perPage=15&page=1',
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
    path: 'http://site-playground-integration/api/cms/snippets',
    per_page: 15,
    to: 1,
    total: 1,
    info: {
      model_attribute: 'title',
      model_label: 'Snippet',
      model_label_plural: 'Snippets',
      model_route: 'playground.cms.api.snippets',
      model_slug: 'snippet',
      model_slug_plural: 'snippets',
      module_label: 'CMS',
      module_label_plural: 'CMS',
      module_route: 'playground.cms.api',
      module_slug: 'cms',
      privilege: 'playground-cms-api:snippet',
      table: 'cms_snippets',
    },
  },
};

const mockSnippetRevisionOne: SnippetRevision = {
  id: '9c9659d5-7ccc-437c-a3cc-01fa01625d73',
  created_by_id: '9baa6092-a30f-461a-a5fc-5132b3264b91',
  modified_by_id: null,
  owned_by_id: null,
  parent_id: null,
  snippet_id: '9c85a579-87a7-4b1e-bc4d-a6746179e009',
  snippet_type: 'banner',
  created_at: '2024-07-14T17:30:07.000000Z',
  updated_at: '2024-07-14T17:30:07.000000Z',
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
  label: '',
  title: 'Test Snippet',
  byline: '',
  slug: 'test-snippet',
  url: '',
  description: '',
  introduction: '',
  content: '<p>Test Snippet Content</p>',
  summary: '',
  locale: '',
  icon: '',
  image: '',
  avatar: '',
  ui: [],
  assets: [],
  meta: [],
  notes: [],
  options: [],
  sources: [],
};

const mockSnippetRevisionsOne: SnippetRevisions = [mockSnippetRevisionOne];

const mockSnippetRevisionOneResponse: SnippetRevisionResponse = {
  data: mockSnippetRevisionOne,
  meta: {
    id: '9c85a579-87a7-4b1e-bc4d-a6746179e009',
    rules: [],
    session_user_id: '9baa6092-a30f-461a-a5fc-5132b3264b91',
    timestamp: '2024-07-14T17:37:13.520331Z',
    validated: [],
    info: {
      model_attribute: 'title',
      model_label: 'Snippet Revision',
      model_label_plural: 'Snippet Revisions',
      model_route: 'playground.cms.api.snippets.revisions',
      model_slug: 'snippet',
      model_slug_plural: 'snippets',
      module_label: 'CMS',
      module_label_plural: 'CMS',
      module_route: 'playground.cms.api',
      module_slug: 'cms',
      privilege: 'playground-cms-api:snippet',
      table: 'cms_snippets',
    },
  },
};

const mockSnippetRevisionsOneResponse: SnippetRevisionsResponse = {
  data: [mockSnippetRevisionOne],
  links: {
    first:
      'http://site-playground-integration/api/cms/snippets/9c85a579-87a7-4b1e-bc4d-a6746179e009/revisions?perPage=15&page=1',
    last: 'http://site-playground-integration/api/cms/snippets/9c85a579-87a7-4b1e-bc4d-a6746179e009/revisions?perPage=15&page=1',
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
        url: 'http://site-playground-integration/api/cms/snippets/9c85a579-87a7-4b1e-bc4d-a6746179e009/revisions?perPage=15&page=1',
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
    path: 'http://site-playground-integration/api/cms/snippets/9c85a579-87a7-4b1e-bc4d-a6746179e009/revisions',
    per_page: 15,
    to: 1,
    total: 1,
    info: {
      model_attribute: 'title',
      model_label: 'Snippet Revision',
      model_label_plural: 'Snippet Revisions',
      model_route: 'playground.cms.api.snippets.revisions',
      model_slug: 'snippet',
      model_slug_plural: 'snippets',
      module_label: 'CMS',
      module_label_plural: 'CMS',
      module_route: 'playground.cms.api',
      module_slug: 'cms',
      privilege: 'playground-cms-api:snippet',
      table: 'cms_snippets',
    },
  },
};

export {
  mockSnippetOne,
  mockSnippetsOne,
  mockSnippetOneResponse,
  mockSnippetsOneResponse,
  mockSnippetRevisionOne,
  mockSnippetRevisionsOne,
  mockSnippetRevisionOneResponse,
  mockSnippetRevisionsOneResponse,
};
