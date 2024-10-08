import {AuthRepository} from "../repositories/AuthRepository";

class AuthService {
  public repo: AuthRepository;

  constructor(repo: AuthRepository) {
    this.repo = repo;
  }

  login(email: string, password: string): Promise<any> {
    return this.repo.login(email, password);
  }
  logout(): Promise<void> {
    return this.repo.logout();
  }
  currentUser(): any {
    return this.repo.currentUser();
  }

  register(email: string, password: string) {
    return this.repo.register(email, password);
  }
}

export default AuthService;