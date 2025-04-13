import { Project } from './project';

describe('Project', () => {
  it('should create an instance', () => {
    expect(
      new Project(
        '1',
        'Test Project',
        'This is a test project',
        new Date('2023-01-01'),
        new Date('2023-01-02')
      )
    ).toBeTruthy();
  });
});
