"""The handoff must identify a task present in the one canonical backlog."""
import shutil,subprocess,sys,tempfile,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class HandoffProtocolTests(unittest.TestCase):
 def fixture(self,root):
  for name in ['AGENTS.md','docs/TD_LIST.md','docs/WORK_CHECKPOINT.md','docs/CHANGELOG.md','docs/DECISIONS.md','docs/PROJECT_PLAYBOOK.md','docs/AGENT_PROTOCOL.md','docs/NEW_PROJECT_SETUP.md','.github/workflows/project-protocol.yml','.github/pull_request_template.md']:
   p=root/name;p.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(ROOT/name,p)
  p=root/'tools/check_project_protocol.py';p.parent.mkdir(parents=True);shutil.copyfile(ROOT/'tools/check_project_protocol.py',p)
  (root/'docs/TD_LIST.md').write_text('# Tasks\n\n### L-011 — Common-usage audit\n')
  (root/'docs/WORK_CHECKPOINT.md').write_text('# Checkpoint\n\nCurrent task: L-011\n')
 def run_check(self,root):
  return subprocess.run([sys.executable,str(root/'tools/check_project_protocol.py')],capture_output=True,text=True)
 def test_existing_current_task_is_accepted(self):
  with tempfile.TemporaryDirectory() as t:
   r=Path(t);self.fixture(r);p=self.run_check(r);self.assertEqual(p.returncode,0,p.stderr)
 def test_current_task_missing_from_canonical_list_is_rejected(self):
  with tempfile.TemporaryDirectory() as t:
   r=Path(t);self.fixture(r);(r/'docs/TD_LIST.md').write_text('# Tasks\n\n### L-001 — Architecture\n');p=self.run_check(r)
   self.assertNotEqual(p.returncode,0,'A task stranded only in a feature PR must not look like a valid main handoff')
   self.assertIn('L-011',p.stderr)
 def test_checkpoint_without_current_task_is_rejected(self):
  with tempfile.TemporaryDirectory() as t:
   r=Path(t);self.fixture(r);(r/'docs/WORK_CHECKPOINT.md').write_text('# Checkpoint\nOld narrative without a next task\n');p=self.run_check(r)
   self.assertNotEqual(p.returncode,0,'A checkpoint needs an explicit current-task pointer')
   self.assertIn('Current task:',p.stderr)
if __name__=='__main__':unittest.main()
