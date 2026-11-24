"""Build one portable HTML file from canonical data, engine and browser UI."""
import argparse
import json
from html import escape
from pathlib import Path
from content_loader import load_content
from audio_loader import load_audio, load_all_course_audio
from focused_loader import load_focused_content

def build(root: Path, output: Path) -> Path:
    course, locales = load_content(root)
    focused=load_focused_content(root, course) if (root/'content/focused/catalog.json').exists() else None
    audio=load_all_course_audio(root,course,focused) if focused else load_audio(root,course)
    default_source = course['defaultDirection'].split('-')[0]
    default_ui = locales[default_source]
    template = (root / 'web/index.html').read_text(encoding='utf-8')
    css = (root / 'web/styles.css').read_text(encoding='utf-8')
    engine = (root / 'core/engine.js').read_text(encoding='utf-8')
    app = (root / 'web/app.js').read_text(encoding='utf-8')
    data = json.dumps(course, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c').replace('>', '\\u003e').replace('&', '\\u0026')
    html = template.replace('<!--STYLE-->', '<style>\n' + css + '\n</style>')
    for key, value in default_ui['static'].items():
        html = html.replace('<!--TEXT:' + key + '-->', escape(value))
    html = html.replace('<!--APP-VERSION-->', escape(json.loads((root/'package.json').read_text())['version']))
    html = html.replace('<!--TITLE-->', escape(default_ui['messages']['pageTitle']))
    html = html.replace('<!--DEFAULT-LANGUAGE-->', default_source)
    options = []
    for direction in course['directions']:
        source, target = direction.split('-')
        selected = ' selected' if direction == course['defaultDirection'] else ''
        label = default_ui['names'][source]['label'] + ' → ' + default_ui['names'][target]['label']
        options.append(f'<option id="direction-{direction}" value="{direction}"{selected}>{escape(label)}</option>')
    html = html.replace('<!--DIRECTIONS-->', ''.join(options))
    noscript = ''.join(f'<p class="error" lang="{code}">{escape(locales[code]["messages"]["noscript"])}</p>' for code in locales)
    html = html.replace('<!--NOSCRIPT-->', noscript)
    ui_data = json.dumps(locales, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c').replace('>', '\\u003e').replace('&', '\\u0026')
    html = html.replace('<!--UI-->', ui_data)
    html = html.replace('<!--COURSE-->', data)
    html = html.replace('<!--FOCUSED-->', json.dumps(focused,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c').replace('>','\\u003e').replace('&','\\u0026'))
    audio_data = json.dumps(audio, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c').replace('>', '\\u003e').replace('&', '\\u0026')
    html = html.replace('<!--AUDIO-DATA-->', audio_data)
    modules = ['audio-player.js', 'audio-view.js']
    html = html.replace('<!--AUDIO-MODULES-->', ''.join('<script>\n' + (root/'web'/name).read_text(encoding='utf-8').replace('</script', '<\\/script') + '\n</script>' for name in modules))
    html = html.replace('<!--ENGINE-->', '<script>\n' + (root/'core/course-selection.js').read_text(encoding='utf-8').replace('</script','<\\/script') + '\n</script>' + '<script>\n' + engine.replace('</script', '<\\/script') + '\n</script>')
    html = html.replace('<!--REPORT-MODULE-->', '<script>\n' + (root/'web/report-panel.js').read_text(encoding='utf-8').replace('</script','<\\/script') + '\n</script>')
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
