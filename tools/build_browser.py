"""Build one portable HTML file from canonical data, engine and browser UI."""
import argparse
import json
from pathlib import Path

def build(root: Path, output: Path) -> Path:
    course = json.loads((root / 'content/lv-ru-10-17.json').read_text(encoding='utf-8'))
    template = (root / 'web/index.html').read_text(encoding='utf-8')
    css = (root / 'web/styles.css').read_text(encoding='utf-8')
    engine = (root / 'core/engine.js').read_text(encoding='utf-8')
    app = (root / 'web/app.js').read_text(encoding='utf-8')
    data = json.dumps(course, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c').replace('>', '\\u003e').replace('&', '\\u0026')
    html = template.replace('<!--STYLE-->', '<style>\n' + css + '\n</style>')
    html = html.replace('<!--COURSE-->', data)
    html = html.replace('<!--ENGINE-->', '<script>\n' + engine.replace('</script', '<\\/script') + '\n</script>')
    html = html.replace('<!--APP-->', '<script>\n' + app.replace('</script', '<\\/script') + '\n</script>')
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(html, encoding='utf-8')
    return output

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=Path('dist/language-learning-test.html'))
    args = parser.parse_args()
    result = build(Path(__file__).resolve().parents[1], args.output)
    print(f'Built {result} ({result.stat().st_size} bytes)')
