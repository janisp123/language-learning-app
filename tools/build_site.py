"""Package only the public landing page and canonical browser test build."""
import argparse
import shutil
from pathlib import Path
from build_browser import build

def build_site(root: Path, output: Path) -> Path:
    if output.exists():
        raise FileExistsError('Use a fresh output directory so no stale files enter publication.')
    output.mkdir(parents=True)
    shutil.copyfile(root / 'docs/discovery-preview/index.html', output / 'index.html')
    app = build(root, output / 'learn/index.html')
    shutil.copyfile(app, output / 'language-learning-test.html')
    return output

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=Path('dist/site'))
    args = parser.parse_args()
    print(build_site(Path(__file__).resolve().parents[1], args.output))
