import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { serializeJson } from '@nrwl/devkit';
import { readJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import * as path from 'path';

describe('Update 2.2.0', () => {
  let initialTree: Tree;
  let schematicRunner: SchematicTestRunner;

  beforeEach(async () => {
    initialTree = createEmptyWorkspace(Tree.empty());

    schematicRunner = new SchematicTestRunner(
      '@nxext/ionic-react',
      path.join(__dirname, '../../../migrations.json')
    );

    initialTree.overwrite(
      'package.json',
      serializeJson({
        dependencies: {
          '@ionic/react': '5.0.7',
          '@ionic/react-router': '5.0.7',
        },
      })
    );
  });

  it(`should update Ionic to 5.2.2`, async () => {
    const result = await schematicRunner
      .runSchematicAsync('upgrade-ionic-2.2.0', {}, initialTree)
      .toPromise();

    const { dependencies } = readJsonInTree(result, '/package.json');
    expect(dependencies['@ionic/react']).toEqual('^5.2.2');
    expect(dependencies['@ionic/react-router']).toEqual('^5.2.2');
  });
});
