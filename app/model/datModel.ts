export interface RepoListModel {
  name: string;
  id: number;
  private: boolean;
  owner: OwnerInfoModel;
  stargazers_count: number;
  language: string;
  license: LicenseInfoModel;
  topics: Array<string>;
  forks: number;
  pushed_at: string;
}

export interface OwnerInfoModel {
  login: string;
}

export interface LicenseInfoModel {
  key: string;
  name: string;
}
